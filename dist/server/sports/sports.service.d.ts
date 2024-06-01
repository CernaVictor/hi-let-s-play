import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
export declare class SportsService {
    private sportsRepository;
    constructor(sportsRepository: Repository<Sport>);
    findAll(): Promise<Sport[]>;
    create(sports: string[]): Promise<Sport[]>;
}
