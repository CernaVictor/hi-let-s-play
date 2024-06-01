import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDivisibleBy,
  IsMilitaryTime,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DayOfTheWeek } from 'common/types';

export class CreateEventDto {
  @IsString()
  @ApiProperty({
    description: 'test',
  })
  sportFieldId: string;

  @IsMilitaryTime()
  startTime: string;

  @IsDivisibleBy(30)
  duration: number;

  @IsDateString()
  validFrom: string;

  @IsOptional()
  @IsDateString()
  validThrough: string;

  @ApiProperty({
    description: 'will be replaced by user',
  })
  bookerName: string;

  @Min(0)
  @Max(6)
  dayOfTheWeek: DayOfTheWeek;
}
