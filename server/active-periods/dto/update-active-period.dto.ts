import { PartialType } from '@nestjs/swagger';
import { CreateActivePeriodDto } from './create-active-period.dto';

export class UpdateActivePeriodDto extends PartialType(CreateActivePeriodDto) {}
