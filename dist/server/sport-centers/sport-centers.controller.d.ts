import { SportCentersService } from './sport-centers.service';
import { CreateSportCenterDto } from './dto/create-sport-center.dto';
import { UpdateSportCenterDto } from './dto/update-sport-center.dto';
import { AuthenticatedRequest } from 'common/types';
export declare class SportCentersController {
    private readonly sportCentersService;
    constructor(sportCentersService: SportCentersService);
    create(createSportCenterDto: CreateSportCenterDto, req: AuthenticatedRequest): Promise<import("./entities/sport-center.entity").SportCenter>;
    findAll(req: AuthenticatedRequest): Promise<import("./entities/sport-center.entity").SportCenter[]>;
    getSportCenterStatistics(req: AuthenticatedRequest, dateFrom: string, dateTo: string): Promise<any[]>;
    findOne(id: string, fields: string[]): Promise<import("./entities/sport-center.entity").SportCenter | null>;
    update(id: string, updateSportCenterDto: UpdateSportCenterDto, files: any[], req: AuthenticatedRequest): Promise<never> | null;
    remove(id: string, req: AuthenticatedRequest): Promise<import("./entities/sport-center.entity").SportCenter> | null;
}
