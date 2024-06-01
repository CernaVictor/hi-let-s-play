import { DeepPartial } from 'typeorm';
import { CreateSportCenterDto } from './create-sport-center.dto';
import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
declare const UpdateSportCenterDto_base: import("@nestjs/common").Type<Partial<CreateSportCenterDto>>;
export declare class UpdateSportCenterDto extends UpdateSportCenterDto_base {
    offBusinessHours: DeepPartial<OffBusinessHours>;
    imageGallery: DeepPartial<SportCenterPhoto>[];
}
export {};
