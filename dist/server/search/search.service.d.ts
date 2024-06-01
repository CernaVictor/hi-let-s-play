import { EventsService } from 'server/events/events.service';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SearchDto } from './dto/search.dto';
import { SportCentersService } from 'server/sport-centers/sport-centers.service';
export declare class SearchService {
    private readonly eventsService;
    private readonly sportCenterService;
    constructor(eventsService: EventsService, sportCenterService: SportCentersService);
    findAvailableFields(searchParams: SearchDto): Promise<SportCenter[]>;
}
