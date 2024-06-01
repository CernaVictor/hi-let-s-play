import { ActivePeriodsService } from './active-periods.service';
import { CreateActivePeriodDto } from './dto/create-active-period.dto';
import { UpdateActivePeriodDto } from './dto/update-active-period.dto';
export declare class ActivePeriodsController {
    private readonly activePeriodsService;
    constructor(activePeriodsService: ActivePeriodsService);
    create(createActivePeriodDto: CreateActivePeriodDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateActivePeriodDto: UpdateActivePeriodDto): string;
    remove(id: string): string;
}
