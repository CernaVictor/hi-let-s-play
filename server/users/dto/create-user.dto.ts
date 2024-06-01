import { Length, IsPhoneNumber, IsBoolean } from 'class-validator';
export class CreateUserDto {
  @Length(3)
  email: string;

  @Length(3)
  displayName: string;

  @IsBoolean()
  isSportCenterOwner: boolean;

  @IsPhoneNumber()
  phoneNumber: string;
}
