import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuggestDto {
  @ApiProperty({ description: 'Suggestning nomi', example: 'MacBook Pro' })
  @IsString()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  title: string;

  @ApiProperty({ description: 'Narxi', example: 1200 })
  @IsNumber()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: 'Baholash (rating)', example: 4.5 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  @Type(() => Number)
  rate?: number;

  @ApiPropertyOptional({ description: 'Chegirma foizi', example: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  @Type(() => Number)
  discount?: number;

  @ApiPropertyOptional({
    description: 'Qo‘shimcha izoh',
    example: 'Yangi model',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  description?: string;

  @ApiPropertyOptional({
    description: 'Rasm nomi (uploaddan so‘ng)',
    example: '1693671289-123456789.png',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    value === '' || value === null ? undefined : value,
  )
  image?: string;
}
