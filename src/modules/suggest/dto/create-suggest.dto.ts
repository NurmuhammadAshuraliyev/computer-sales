import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuggestDto {
  @ApiProperty({
    description: 'Suggestning nomi',
    example: 'MacBook Pro',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Narxi',
    example: 1200,
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    description: 'Baholash (rating)',
    example: 4.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({
    description: 'Chegirma foizi',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({
    description: 'Qo‘shimcha izoh',
    example: 'Yangi model, tezkor, 16GB RAM',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Rasm nomi (serverga yuklangandan keyin)',
    example: '1693671289-123456789.png',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Kategoriya ID (UUID)',
    example: '9f38e2f8-3a1e-4b5f-89d4-9d1234567890',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'Foydalanuvchi ID (UUID)',
    example: '4b71e4c6-8d2e-49f2-90c2-1a9876543210',
  })
  @IsString()
  userId: string;
}
