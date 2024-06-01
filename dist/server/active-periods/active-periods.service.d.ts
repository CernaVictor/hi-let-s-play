import { CreateActivePeriodDto } from './dto/create-active-period.dto';
import { UpdateActivePeriodDto } from './dto/update-active-period.dto';
export declare class ActivePeriodsService {
    create(createActivePeriodDto: CreateActivePeriodDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateActivePeriodDto: UpdateActivePeriodDto): string;
    remove(id: number): string;
}
