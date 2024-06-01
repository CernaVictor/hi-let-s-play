import { PartialType } from '@nestjs/swagger';
import { SportFieldEvent } from '../entities/event.entity';

export class UpdateEventDto extends PartialType(SportFieldEvent) {}
