import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryItemDto {
  @ApiProperty({
    example: 'MacBook Air M1',
    description: 'Item nomi (2–100 ta belgigacha)',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 'Tez va yengil ultrabook',
    description: 'Qo‘shimcha izoh',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 999.99,
    description: 'Narxi (ixtiyoriy)',
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: '9d9d7f9e-6b7a-4e1f-bb1b-4f8a2e0f0a12',
    description: 'Category ID (UUID)',
    format: 'uuid',
  })
  @IsUUID()
  categoryId: string;
}
