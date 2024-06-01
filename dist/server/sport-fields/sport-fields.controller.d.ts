import { SportFieldsService } from './sport-fields.service';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';
import { AuthenticatedRequest } from 'common/types';
export declare class SportFieldsController {
    private readonly sportFieldsService;
    constructor(sportFieldsService: SportFieldsService);
    create(createSportFieldDto: CreateSportFieldDto): Promise<import("./entities/sport-field.entity").SportField>;
    findAll(req: AuthenticatedRequest, sportCenterId: string): Promise<import("./entities/sport-field.entity").SportField[]>;
    findOne(id: string): Promise<import("./entities/sport-field.entity").SportField | null>;
    update(id: string, updateSportFieldDto: UpdateSportFieldDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: AuthenticatedRequest): Promise<import("./entities/sport-field.entity").SportField> | null;
}
