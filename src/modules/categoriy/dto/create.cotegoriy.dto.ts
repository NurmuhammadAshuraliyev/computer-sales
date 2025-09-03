import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Elektronika' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 1500 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: '1693671289-987654321.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string; // fayl nomi saqlanadi
}
