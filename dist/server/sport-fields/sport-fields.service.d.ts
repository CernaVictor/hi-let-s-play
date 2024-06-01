import { Repository } from 'typeorm';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';
import { SportField } from './entities/sport-field.entity';
export declare class SportFieldsService {
    private sportFieldsRepository;
    constructor(sportFieldsRepository: Repository<SportField>);
    create(createSportFieldDto: CreateSportFieldDto): Promise<SportField>;
    findAll(sportCenterId: string, userId: string): Promise<SportField[]>;
    findOne(id: string): Promise<SportField | null>;
    update(id: string, updateSportFieldDto: UpdateSportFieldDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string, userId: string): Promise<SportField>;
}
