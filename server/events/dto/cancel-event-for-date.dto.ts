import { IsDateString, IsString } from 'class-validator';

export class CancelEventDto {
  @IsDateString()
  date: string;

  @IsString()
  activePeriodId: string;
}
