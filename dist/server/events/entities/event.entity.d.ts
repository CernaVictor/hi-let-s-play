import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { User } from 'server/users/entities/user.entity';
export declare class Event {
    id: string;
    creator: User;
    activePeriods: ActivePeriod[];
}
export declare class OffBusinessHours extends Event {
    sportCenter: SportCenter;
}
export declare class SportFieldEvent extends Event {
    sportField: SportField;
}
