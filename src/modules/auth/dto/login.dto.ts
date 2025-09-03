import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Foydalanuvchi nomi (login)',
    example: 'azizbek_99',
    maxLength: 50,
    minLength: 3,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Parol',
    example: 'StrongP@ssw0rd',
    maxLength: 50,
    minLength: 5,
  })
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  password: string;
}
