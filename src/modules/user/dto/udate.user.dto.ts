import { Optional } from '@nestjs/common';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  new_password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber?: string;
}
