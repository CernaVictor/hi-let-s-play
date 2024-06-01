import { SportFieldPhoto } from 'server/entities/photo.entity';
import { SportFieldEvent } from 'server/events/entities/event.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { Sport } from 'server/sports/entities/sport.entity';
export declare class SportField {
    id: string;
    name: string;
    description: string;
    isHeated: boolean;
    isIluminated: boolean;
    isIndoor: boolean;
    isCovered: boolean;
    events: SportFieldEvent[];
    sportCenter: SportCenter;
    imageGallery: SportFieldPhoto[];
    sport: Sport;
}
