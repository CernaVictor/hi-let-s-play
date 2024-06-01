import { Event } from 'server/events/entities/event.entity';
import { DayOfTheWeek } from 'common/types';
export declare class ActivePeriod {
    id: string;
    event: Event;
    validFrom: string;
    validThrough: string;
    startTime: string;
    duration: number;
    dayOfTheWeek: DayOfTheWeek;
}
