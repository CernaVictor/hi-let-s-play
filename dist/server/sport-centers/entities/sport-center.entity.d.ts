import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { User } from 'server/users/entities/user.entity';
export declare class SportCenter {
    id: string;
    name: string;
    description: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
    sportFields: SportField[];
    owner: User;
    offBusinessHours: OffBusinessHours;
    imageGallery: SportCenterPhoto[];
}
