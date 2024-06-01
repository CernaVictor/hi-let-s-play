import { Injectable } from '@nestjs/common';
import { EventsService } from 'server/events/events.service';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SearchDto } from './dto/search.dto';
import * as dayjs from 'dayjs';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { DATE_TIME_FORMAT } from 'common/constants';
import {
  getAvailableIntervals,
  getMergedOverlappingTimeIntervals,
  getSuggestions,
} from 'server/utils';
import { SportCentersService } from 'server/sport-centers/sport-centers.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly sportCenterService: SportCentersService,
  ) {}

  async findAvailableFields(searchParams: SearchDto) {
    const { duration, intervalEnd, intervalStart, sport, latitude, longitude } =
      searchParams;

    const queryBuilder =
      this.sportCenterService.getSportCentersEventBetweenDatesQueryBuilder(
        intervalStart,
        intervalEnd,
      );

    const sportCenters = await queryBuilder
      .leftJoinAndSelect('sc.imageGallery', 'img')
      .leftJoin('sf.sport', 'sport')
      .where(
        'distance(sc.latitude, sc.longitude, :latitude, :longitude) < 10000',
        {
          latitude,
          longitude,
        },
      )
      .andWhere('sport.id = :sport', { sport })
      .getMany();

    const filteredSportCenters: SportCenter[] = [];

    sportCenters.forEach((sc) => {
      const filteredSportFields: Array<SportField & { suggestions: any[] }> =
        [];
      sc.sportFields.forEach((sf) => {
        const activePeriods = sf.events
          .flatMap((ev) => ev.activePeriods)
          .concat(sc.offBusinessHours?.activePeriods ?? []);

        const formatedActivePeriods = activePeriods.map((ap) => {
          const [hours, minutes] = ap.startTime.split(':');
          const weekStart = dayjs(intervalStart).startOf('week');
          let apStartTimeInMinutes =
            1440 * ap.dayOfTheWeek + Number(hours) * 60 + Number(minutes);
          let apEndTimeInMinutes = apStartTimeInMinutes + ap.duration;

          const intervalStartInMinutes = dayjs(intervalStart).diff(
            weekStart,
            'minutes',
          );
          const intervalEndInMinutes = dayjs(intervalEnd).diff(
            weekStart,
            'minutes',
          );

          if (
            !(
              intervalStartInMinutes < apEndTimeInMinutes &&
              intervalEndInMinutes > apStartTimeInMinutes
            )
          ) {
            if (apEndTimeInMinutes > 10080) {
              apStartTimeInMinutes -= 10080;
              apEndTimeInMinutes -= 10080;
            } else {
              apStartTimeInMinutes += 10080;
              apEndTimeInMinutes += 10080;
            }
          }

          const startDate = weekStart.add(apStartTimeInMinutes, 'minutes');
          const endDate = startDate.add(ap.duration, 'minutes');

          return {
            startDate: startDate.format(DATE_TIME_FORMAT),
            endDate: endDate.format(DATE_TIME_FORMAT),
          };
        });

        const mergedIntervals = getMergedOverlappingTimeIntervals(
          formatedActivePeriods,
        );

        if (!mergedIntervals.length) {
          const suggestions = getSuggestions(
            intervalStart,
            intervalEnd,
            duration,
          ).slice(0, 5);
          if (suggestions.length) {
            filteredSportFields.push({
              ...sf,
              suggestions,
            });
          }
        } else {
          const availableIntervals = getAvailableIntervals(
            mergedIntervals,
            intervalStart,
            intervalEnd,
          );
          const suggestions = availableIntervals
            .flatMap((slot) =>
              getSuggestions(slot.startDate, slot.endDate, duration),
            )
            .slice(0, 5);
          if (suggestions.length) {
            filteredSportFields.push({
              ...sf,
              suggestions,
            });
          }
        }
      });
      if (filteredSportFields.length) {
        filteredSportCenters.push({
          ...sc,
          sportFields: filteredSportFields,
        });
      }
    });

    return filteredSportCenters;
  }
}
