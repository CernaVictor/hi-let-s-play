import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SportFieldEvent } from './entities/event.entity';
import * as dayjs from 'dayjs';
import { CancelEventDto } from './dto/cancel-event-for-date.dto';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(SportCenter)
    private sportCenterRepository: Repository<SportCenter>,
    @InjectRepository(SportFieldEvent)
    private eventRepository: Repository<SportFieldEvent>,
    @InjectRepository(ActivePeriod)
    private activePeriodRepository: Repository<ActivePeriod>,
  ) {}

  async create(createEventDto: CreateEventDto, creatorId: string) {
    const overlappingEvents = await this.getOverlappingEvents(createEventDto);
    if (overlappingEvents.length) {
      throw new HttpException('Overlapping event', HttpStatus.CONFLICT);
    }

    const activePeriod = this.activePeriodRepository.create(createEventDto);
    const event = this.eventRepository.create({
      activePeriods: [activePeriod],
      sportField: {
        id: createEventDto.sportFieldId,
      },
      creator: {
        id: creatorId,
      },
    });
    return this.eventRepository.save(event);
  }

  findAllEventsForSportField(
    sportFieldId: string,
    dateFrom: string,
    dateTo: string,
  ) {
    return this.eventRepository.find({
      where: [
        {
          sportField: { id: sportFieldId },
          activePeriods: {
            validFrom: LessThanOrEqual(dateTo),
            validThrough: MoreThanOrEqual(dateFrom),
          },
        },
        {
          sportField: { id: sportFieldId },
          activePeriods: {
            validFrom: LessThanOrEqual(dateTo),
            validThrough: IsNull(),
          },
        },
      ],
    });
  }

  getUserCalendarEvents(userId: string, dateFrom: string, dateTo: string) {
    return this.eventRepository.find({
      where: [
        {
          creator: { id: userId },
          activePeriods: {
            validFrom: LessThanOrEqual(dateTo),
            validThrough: MoreThanOrEqual(dateFrom),
          },
        },
        {
          creator: { id: userId },
          activePeriods: {
            validFrom: LessThanOrEqual(dateTo),
            validThrough: IsNull(),
          },
        },
      ],
    });
  }

  findOne(id: string) {
    return this.eventRepository.find({ where: { id } });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string, userId: string) {
    const event = await this.eventRepository.findOneOrFail({
      where: [
        {
          id,
          creator: {
            id: userId,
          },
        },
        {
          id,
          sportField: {
            sportCenter: {
              owner: {
                id: userId,
              },
            },
          },
        },
      ],
    });

    return this.eventRepository.remove(event);
  }

  deleteAll() {
    return this.eventRepository.createQueryBuilder().delete().execute();
  }

  async getOverlappingEvents({
    validFrom,
    validThrough,
    dayOfTheWeek,
    duration,
    startTime,
    sportFieldId,
  }: CreateEventDto) {
    const [hours, minutes] = startTime.split(':');
    const startTimeInMinutes =
      Number(dayOfTheWeek) * 1440 + Number(hours) * 60 + Number(minutes);
    const endTimeInMinutes = startTimeInMinutes + duration;

    const existingEventStartTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60)`;
    const existingEventEndTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60 + ap."duration")`;

    const sportCenter = await this.sportCenterRepository.findOneOrFail({
      where: {
        sportFields: {
          id: sportFieldId,
        },
      },
    });

    const queryBuilder = this.activePeriodRepository
      .createQueryBuilder('ap')
      .leftJoin('ap.event', 'event')
      .leftJoin('event.sportField', 'sportField')
      .leftJoin('event.sportCenter', 'sportCenter')
      .andWhere(
        `(sportField.id = :sportFieldId OR sportCenter.id = :sportCenterId)`,
        {
          sportFieldId,
          sportCenterId: sportCenter.id,
        },
      )
      .andWhere('(ap.validThrough >= :validFrom OR ap.validThrough IS NULL)', {
        validFrom,
      });

    if (validThrough) {
      queryBuilder.andWhere('(ap.validFrom <= :validThrough)', {
        validThrough,
      });
    }

    queryBuilder.andWhere(
      `
      ((
        :startTimeInMinutes1 < ${existingEventEndTimeInMinutes}
        AND :endTimeInMinutes1 > ${existingEventStartTimeInMinutes}
      )
      OR 
      (
          CASE
              WHEN :endTimeInMinutes2 > 10080 THEN (:endTimeInMinutes3 % 10080) > ${existingEventStartTimeInMinutes}
              WHEN ${existingEventEndTimeInMinutes} > 10080 THEN ${existingEventEndTimeInMinutes} - 10080 > :startTimeInMinutes2
          END
      ))
      `,
      {
        startTimeInMinutes1: startTimeInMinutes,
        startTimeInMinutes2: startTimeInMinutes,
        endTimeInMinutes1: endTimeInMinutes,
        endTimeInMinutes2: endTimeInMinutes,
        endTimeInMinutes3: endTimeInMinutes,
      },
    );

    return queryBuilder.getMany();
  }

  async cancelEvent(
    id: string,
    cancelEventDto: CancelEventDto,
    userId: string,
  ) {
    const { date, activePeriodId } = cancelEventDto;

    const event = await this.eventRepository.findOneOrFail({
      where: [
        {
          id,
          creator: {
            id: userId,
          },
        },
        {
          id,
          sportField: {
            sportCenter: {
              owner: {
                id: userId,
              },
            },
          },
        },
      ],
      relations: {
        activePeriods: true,
      },
    });

    const activePeriod = event?.activePeriods.find(
      (ap) => ap.id === activePeriodId,
    );

    //send error message
    if (!event || !activePeriod) return;

    const nextActivePeriod = this.activePeriodRepository.create({
      dayOfTheWeek: activePeriod.dayOfTheWeek,
      duration: activePeriod.duration,
      startTime: activePeriod.startTime,
      validFrom: dayjs(date).add(1, 'week').format(),
      validThrough: activePeriod.validThrough,
    });

    activePeriod.validThrough = date;

    const validActivePeriods: ActivePeriod[] = event.activePeriods.filter(
      (ap) => ap.id !== activePeriodId,
    );

    if (
      !activePeriod.validThrough ||
      (!dayjs(activePeriod.validFrom).isSame(activePeriod.validThrough) &&
        dayjs(activePeriod.validFrom).isBefore(activePeriod.validThrough))
    ) {
      validActivePeriods.push(activePeriod);
    } else {
      this.activePeriodRepository.remove(activePeriod);
    }
    if (
      !nextActivePeriod.validThrough ||
      (!dayjs(nextActivePeriod.validFrom).isSame(
        nextActivePeriod.validThrough,
      ) &&
        dayjs(nextActivePeriod.validFrom).isBefore(
          nextActivePeriod.validThrough,
        ))
    ) {
      validActivePeriods.push(nextActivePeriod);
    }

    if (validActivePeriods.length) {
      event.activePeriods = validActivePeriods;
      return this.eventRepository.save(event);
    }

    return this.eventRepository.remove(event);
  }
}
