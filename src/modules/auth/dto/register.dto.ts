import { Role } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Foydalanuvchining ismi',
    example: 'Azizbek',
    maxLength: 50,
    minLength: 3,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  firstName: string;

  @ApiProperty({
    description: 'Foydalanuvchining familiyasi',
    example: 'Xolmatov',
    maxLength: 50,
    minLength: 3,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    description: 'Foydalanuvchi username',
    example: 'azizbek_99',
    maxLength: 50,
    minLength: 3,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Parol (kuchli bo‘lishi kerak)',
    example: 'StrongP@ssw0rd',
    maxLength: 50,
    minLength: 5,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  password: string;

  @ApiProperty({
    description: 'Telefon raqam (UZ formatda)',
    example: '+998901234567',
  })
  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi roli',
    enum: Role,
    example: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role, { message: 'role faqat: ADMIN | MODERATOR | USER' })
  role?: Role;
}
