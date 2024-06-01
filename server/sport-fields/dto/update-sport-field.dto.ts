import { PartialType } from '@nestjs/swagger';
import { SportField } from '../entities/sport-field.entity';

export class UpdateSportFieldDto extends PartialType(SportField) {}
