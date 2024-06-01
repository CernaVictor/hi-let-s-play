import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
import { FileUploadService } from 'server/file-upload/file-upload.service';
import { Repository } from 'typeorm';
import { CreateSportCenterDto } from './dto/create-sport-center.dto';
import { UpdateSportCenterDto } from './dto/update-sport-center.dto';
import { SportCenter } from './entities/sport-center.entity';
export declare class SportCentersService {
    private sportsCenterRepository;
    private offBussinessHoursRepository;
    private photoRepository;
    private readonly fileUploadService;
    constructor(sportsCenterRepository: Repository<SportCenter>, offBussinessHoursRepository: Repository<OffBusinessHours>, photoRepository: Repository<SportCenterPhoto>, fileUploadService: FileUploadService);
    create(createSportCenterDto: CreateSportCenterDto, ownerId: string): Promise<SportCenter>;
    findAll(id: string): Promise<SportCenter[]>;
    findOne(id: string, fields: string[]): Promise<SportCenter | null>;
    updateImageGallery(sportCenter: SportCenter, existingGallery: SportCenterPhoto[], files: any[], newGallery: {
        id?: string;
    }[]): Promise<{
        imageGallery: SportCenterPhoto[];
        id: string;
        name: string;
        description: string;
        phoneNumber: string;
        country: string;
        city: string;
        address: string;
        latitude: number;
        longitude: number;
        sportFields: import("../sport-fields/entities/sport-field.entity").SportField[];
        owner: import("../users/entities/user.entity").User;
        offBusinessHours: OffBusinessHours;
    } & SportCenter>;
    update(id: string, updateSportCenterDto: UpdateSportCenterDto, files: any[], userId: string): Promise<never>;
    remove(id: string, userId: string): Promise<SportCenter>;
    checkSportCenterOwner(sportCenterId: string, userId: string): Promise<SportCenter>;
    getSportCentersEventBetweenDatesQueryBuilder: (intervalStart: string, intervalEnd: string) => import("typeorm").SelectQueryBuilder<SportCenter>;
    getSportCenterStatistics(userId: string, dateFrom: string, dateTo: string): Promise<any[]>;
}
