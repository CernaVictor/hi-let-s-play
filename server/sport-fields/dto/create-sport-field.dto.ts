import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateSportFieldDto {
  @IsUUID()
  sportCenterId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  sport: string;

  @IsBoolean()
  isHeated: boolean;

  @IsBoolean()
  isIluminated: boolean;

  @IsBoolean()
  isIndoor: boolean;

  @IsBoolean()
  isCovered: boolean;
}
