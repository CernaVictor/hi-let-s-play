import { Event } from 'server/events/entities/event.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
export declare class User {
    id: string;
    createdAt: string;
    email: string;
    name: string;
    username: string;
    password: string;
    events: Event[];
    isSportsCenterOwner: boolean;
    sportCenters: SportCenter[];
}
