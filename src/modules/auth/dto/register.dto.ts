import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  firstName: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  lastName: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username: string;

  @IsString()
  @MaxLength(50)
  @MinLength(5)
  password: string;

  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber: string;
}
