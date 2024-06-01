import { SportsService } from './sports.service';
export declare class SportsController {
    private readonly sportsService;
    constructor(sportsService: SportsService);
    findAll(): Promise<import("./entities/sport.entity").Sport[]>;
    create(sports: string[]): Promise<import("./entities/sport.entity").Sport[]>;
}
