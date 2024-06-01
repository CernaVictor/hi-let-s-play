import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateSportCenterDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
