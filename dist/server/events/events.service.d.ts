import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SportFieldEvent } from './entities/event.entity';
import { CancelEventDto } from './dto/cancel-event-for-date.dto';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
export declare class EventsService {
    private sportCenterRepository;
    private eventRepository;
    private activePeriodRepository;
    constructor(sportCenterRepository: Repository<SportCenter>, eventRepository: Repository<SportFieldEvent>, activePeriodRepository: Repository<ActivePeriod>);
    create(createEventDto: CreateEventDto, creatorId: string): Promise<SportFieldEvent>;
    findAllEventsForSportField(sportFieldId: string, dateFrom: string, dateTo: string): Promise<SportFieldEvent[]>;
    getUserCalendarEvents(userId: string, dateFrom: string, dateTo: string): Promise<SportFieldEvent[]>;
    findOne(id: string): Promise<SportFieldEvent[]>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string, userId: string): Promise<SportFieldEvent>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
    getOverlappingEvents({ validFrom, validThrough, dayOfTheWeek, duration, startTime, sportFieldId, }: CreateEventDto): Promise<ActivePeriod[]>;
    cancelEvent(id: string, cancelEventDto: CancelEventDto, userId: string): Promise<SportFieldEvent | undefined>;
}
