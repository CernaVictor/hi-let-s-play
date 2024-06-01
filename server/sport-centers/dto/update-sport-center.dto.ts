import { PartialType } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { CreateSportCenterDto } from './create-sport-center.dto';
import { Transform } from 'class-transformer';
import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';

export class UpdateSportCenterDto extends PartialType(CreateSportCenterDto) {
  @Transform(({ value }) => JSON.parse(value))
  offBusinessHours: DeepPartial<OffBusinessHours>;
  @Transform(({ value }) => JSON.parse(value))
  imageGallery: DeepPartial<SportCenterPhoto>[];
}
