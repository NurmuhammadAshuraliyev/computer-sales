import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Foydalanuvchi ismi',
    example: 'Azizbek',
    maxLength: 50,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi familiyasi',
    example: 'Xolmatov',
    maxLength: 50,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Eski parol (agar parolni yangilash kerak bo‘lsa)',
    example: 'OldP@ssw0rd',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Yangi parol',
    example: 'NewStr0ngP@ss',
  })
  @IsOptional()
  @IsString()
  new_password?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi username',
    example: 'azizbek_99',
    maxLength: 50,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username?: string;

  @ApiPropertyOptional({
    description: 'Telefon raqam (UZ formatda)',
    example: '+998901234567',
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber?: string;
}
