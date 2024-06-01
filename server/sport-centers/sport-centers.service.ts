import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
import { FileUploadService } from 'server/file-upload/file-upload.service';
import { Repository } from 'typeorm';
import { CreateSportCenterDto } from './dto/create-sport-center.dto';
import { UpdateSportCenterDto } from './dto/update-sport-center.dto';
import { SportCenter } from './entities/sport-center.entity';
import * as dayjs from 'dayjs';
import { DATE_FORMAT } from 'common/constants';

@Injectable()
export class SportCentersService {
  constructor(
    @InjectRepository(SportCenter)
    private sportsCenterRepository: Repository<SportCenter>,
    @InjectRepository(OffBusinessHours)
    private offBussinessHoursRepository: Repository<OffBusinessHours>,
    @InjectRepository(SportCenterPhoto)
    private photoRepository: Repository<SportCenterPhoto>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  create(createSportCenterDto: CreateSportCenterDto, ownerId: string) {
    const sportsCenter = this.sportsCenterRepository.create({
      ...createSportCenterDto,
      owner: {
        id: ownerId,
      },
    });
    return this.sportsCenterRepository.save(sportsCenter);
  }

  findAll(id: string) {
    return this.sportsCenterRepository.find({
      where: {
        owner: {
          id,
        },
      },
    });
  }

  findOne(id: string, fields: string[]) {
    return this.sportsCenterRepository.findOne({
      where: { id },
      relations: fields,
    });
  }

  async updateImageGallery(
    sportCenter: SportCenter,
    existingGallery: SportCenterPhoto[],
    files: any[],
    newGallery: { id?: string }[],
  ) {
    const remainingPhotosId = newGallery
      ?.filter((el) => !!el.id)
      .map((el) => el.id);

    const photosToBeDeleted = existingGallery.filter(
      (el) => !remainingPhotosId?.includes(el.id),
    );

    const remainingPhotos = existingGallery.filter((el) =>
      remainingPhotosId?.includes(el.id),
    );

    //remove deleted photos
    this.fileUploadService.destroyFiles(
      photosToBeDeleted.map((photo) => photo.id),
    );
    this.photoRepository.remove(photosToBeDeleted);

    //upload new photos
    const results = await this.fileUploadService.uploadFiles(
      files,
      sportCenter.id,
    );
    const newImages = this.photoRepository.create(results);

    return this.sportsCenterRepository.save({
      ...sportCenter,
      imageGallery: [...remainingPhotos, ...newImages],
    });
  }

  async update(
    id: string,
    updateSportCenterDto: UpdateSportCenterDto,
    files: any[],
    userId: string,
  ) {
    const sportCenter = await this.sportsCenterRepository.findOneOrFail({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
      relations: {
        imageGallery: true,
      },
    });

    if (files.length || !!updateSportCenterDto.imageGallery) {
      await this.updateImageGallery(
        sportCenter,
        sportCenter.imageGallery,
        files,
        updateSportCenterDto.imageGallery,
      );
    }

    const updatedSportCenter = {
      ...sportCenter,
      ...updateSportCenterDto,
      imageGallery: undefined,
    };

    if (!!updateSportCenterDto.offBusinessHours) {
      const newBusinessHours = this.offBussinessHoursRepository.create(
        updateSportCenterDto.offBusinessHours,
      );

      updatedSportCenter.offBusinessHours = newBusinessHours;
    }

    return this.sportsCenterRepository.save(updatedSportCenter);
  }

  async remove(id: string, userId: string) {
    const sportCenter = await this.sportsCenterRepository.findOneOrFail({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
    });
    return this.sportsCenterRepository.remove(sportCenter);
  }

  checkSportCenterOwner(sportCenterId: string, userId: string) {
    return this.sportsCenterRepository.findOneOrFail({
      where: {
        id: sportCenterId,
        owner: {
          id: userId,
        },
      },
    });
  }

  getSportCentersEventBetweenDatesQueryBuilder = (
    intervalStart: string,
    intervalEnd: string,
  ) => {
    const existingEventStartTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60)`;
    const existingEventEndTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60 + ap."duration")`;

    const existingObhStartTimeInMinutes = `((obh_ap."dayOfTheWeek" * 1440) + extract(epoch from obh_ap."startTime") / 60)`;
    const existingObhEndTimeInMinutes = `((obh_ap."dayOfTheWeek" * 1440) + extract(epoch from obh_ap."startTime") / 60 + obh_ap."duration")`;

    const startTimeInMinutes = dayjs(intervalStart).diff(
      dayjs(intervalStart).startOf('week'),
      'minutes',
    );
    const endTimeInMinutes =
      startTimeInMinutes + dayjs(intervalEnd).diff(intervalStart, 'minutes');

    return this.sportsCenterRepository
      .createQueryBuilder('sc')
      .leftJoinAndSelect('sc.sportFields', 'sf')
      .leftJoinAndSelect('sf.events', 'ev')
      .leftJoinAndSelect('sc.offBusinessHours', 'obh')
      .leftJoinAndSelect(
        'ev.activePeriods',
        'ap',
        `(ap.validThrough IS DISTINCT FROM ap.validFrom)  
        AND (ap.validThrough >= :validFrom OR ap.validThrough IS NULL)  
        AND (ap.validFrom <= :validThrough)
        AND ((
          :startTimeInMinutes < ${existingEventEndTimeInMinutes}
          AND :endTimeInMinutes > ${existingEventStartTimeInMinutes}
        )
        OR 
        (
            CASE
                WHEN :endTimeInMinutes > 10080 THEN (:endTimeInMinutes % 10080) > ${existingEventStartTimeInMinutes}
                WHEN ${existingEventEndTimeInMinutes} > 10080 THEN ${existingEventEndTimeInMinutes} - 10080 > :startTimeInMinutes
            END
        ))`,
        {
          validFrom: intervalStart,
          validThrough: intervalEnd,
          startTimeInMinutes,
          endTimeInMinutes,
        },
      )
      .leftJoinAndSelect(
        'obh.activePeriods',
        'obh_ap',
        `(obh_ap.validThrough IS DISTINCT FROM obh_ap.validFrom)  
        AND (obh_ap.validThrough >= :validFrom OR obh_ap.validThrough IS NULL)  
        AND (obh_ap.validFrom <= :validThrough)
        AND ((
          :startTimeInMinutes < ${existingObhEndTimeInMinutes}
          AND :endTimeInMinutes > ${existingObhStartTimeInMinutes}
        )
        OR 
        (
            CASE
                WHEN :endTimeInMinutes > 10080 THEN (:endTimeInMinutes % 10080) > ${existingObhStartTimeInMinutes}
                WHEN ${existingObhEndTimeInMinutes} > 10080 THEN ${existingObhEndTimeInMinutes} - 10080 > :startTimeInMinutes
            END
        ))`,
        {
          validFrom: intervalStart,
          validThrough: intervalEnd,
          startTimeInMinutes,
          endTimeInMinutes,
        },
      );
  };

  async getSportCenterStatistics(
    userId: string,
    dateFrom: string,
    dateTo: string,
  ) {
    const queryBuilder = this.getSportCentersEventBetweenDatesQueryBuilder(
      dateFrom,
      dateTo,
    );
    const sportCenters = await queryBuilder
      .leftJoinAndSelect('sc.owner', 'owner')
      .leftJoinAndSelect('ev.creator', 'creator')
      .where('owner.id = :userId', { userId })
      .getMany();

    const statistics: any[] = [];

    sportCenters.forEach((sportCenter) => {
      let nrOfEvents = 0;
      let nrOfUsers = 0;
      let duration = 0;
      let offDuration = 0;

      sportCenter.sportFields.forEach((sportField) => {
        nrOfEvents += sportField.events.length;
        const sportFieldUsers: string[] = [];
        sportField.events.forEach((event) => {
          if (
            event.creator?.id &&
            !sportFieldUsers.includes(event.creator?.id)
          ) {
            sportFieldUsers.push(event.creator.id);
          }
          event.activePeriods.forEach((ap) => {
            const end =
              !!ap.validThrough && dayjs(ap.validThrough).isBefore(dateTo)
                ? dayjs(ap.validThrough).format(DATE_FORMAT)
                : dateTo;
            const start =
              !!ap.validFrom && dayjs(ap.validFrom).isAfter(dateFrom)
                ? dayjs(ap.validFrom).format(DATE_FORMAT)
                : dateFrom;

            const nrOfOccurences = Math.floor(
              dayjs(end).diff(start, 'days') / 7,
            );

            duration += ap.duration * (nrOfOccurences ? nrOfOccurences : 1);
          });
        });
        nrOfUsers += sportFieldUsers.length;
      });

      sportCenter.offBusinessHours?.activePeriods.forEach((ap) => {
        const end =
          !!ap.validThrough && dayjs(ap.validThrough).isBefore(dateTo)
            ? dayjs(ap.validThrough).format(DATE_FORMAT)
            : dateTo;
        const start =
          !!ap.validFrom && dayjs(ap.validFrom).isAfter(dateFrom)
            ? ap.validFrom
            : dateFrom;
        const nrOfOccurences = Math.floor(dayjs(end).diff(start, 'days') / 7);

        offDuration += ap.duration * (nrOfOccurences ? nrOfOccurences : 1);
      });

      const intervalInMinutes = dayjs(dateTo).diff(dateFrom, 'minutes');
      const occupiedPercentage =
        (duration / (intervalInMinutes - offDuration)) * 100;

      statistics.push({
        name: sportCenter.name,
        nrOfEvents,
        nrOfUsers,
        occupiedPercentage: occupiedPercentage.toFixed(2),
      });
    });

    return statistics;
  }
}
