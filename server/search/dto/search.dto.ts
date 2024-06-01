import { Transform } from 'class-transformer';
import { IsDateString, IsDivisibleBy, IsString } from 'class-validator';
import { PaginationDto } from 'server/general-dtos/general-dtos';

export class SearchDto extends PaginationDto {
  @IsDateString()
  intervalStart: string;

  @IsDateString()
  intervalEnd: string;

  @Transform(({ value }) => parseInt(value))
  @IsDivisibleBy(30)
  duration: number;

  @IsString()
  sport: string;

  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}
