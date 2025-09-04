import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({
    example: 'alo',
    description: 'Admin login uchun foydalanuvchi nomi',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'aloadmin',
    description: 'Admin login uchun parol',
  })
  @IsString()
  password: string;
}
