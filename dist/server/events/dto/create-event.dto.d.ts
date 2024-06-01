import { DayOfTheWeek } from 'common/types';
export declare class CreateEventDto {
    sportFieldId: string;
    startTime: string;
    duration: number;
    validFrom: string;
    validThrough: string;
    bookerName: string;
    dayOfTheWeek: DayOfTheWeek;
}
