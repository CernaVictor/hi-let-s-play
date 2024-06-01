import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CancelEventDto } from './dto/cancel-event-for-date.dto';
import { AuthenticatedRequest } from 'common/types';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(req: AuthenticatedRequest, createEventDto: CreateEventDto): Promise<import("./entities/event.entity").SportFieldEvent> | null;
    findAllEventsForSportField(sportFieldId: string, dateFrom: string, dateTo: string): Promise<import("./entities/event.entity").SportFieldEvent[]>;
    getUserCalendarEvents(req: AuthenticatedRequest, dateFrom: string, dateTo: string): Promise<import("./entities/event.entity").SportFieldEvent[]> | null;
    getOverlappingEvents(event: CreateEventDto): Promise<import("../active-periods/entities/active-period.entity").ActivePeriod[]>;
    findOne(id: string): Promise<import("./entities/event.entity").SportFieldEvent[]>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
    cancelEvent(id: string, cancelEventDto: CancelEventDto, req: AuthenticatedRequest): Promise<import("./entities/event.entity").SportFieldEvent | undefined> | null;
    remove(id: string, req: AuthenticatedRequest): Promise<import("./entities/event.entity").SportFieldEvent> | null;
    removeAll(): Promise<import("typeorm").DeleteResult>;
}
