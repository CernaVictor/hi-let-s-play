import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
export declare class Photo {
    id: string;
    url: string;
}
export declare class SportCenterPhoto extends Photo {
    sportCenter: SportCenter;
}
export declare class SportFieldPhoto extends Photo {
    sportField: SportField;
}
