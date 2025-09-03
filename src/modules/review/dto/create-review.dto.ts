import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiPropertyOptional({
    description: 'Sharh matni',
    example: 'Juda zo‘r mahsulot, sifatli va tez yetkazib berildi!',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Baholash (1 dan 5 gacha)',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    description: 'Mahsulot ID (UUID)',
    example: '3f8a1c62-4f8b-47a2-97a1-9d1234567890',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Kategoriya ID (UUID)',
    example: '7a82c2f8-1b1c-4a5d-91d4-9a9876543210',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'Foydalanuvchi ID (UUID)',
    example: '1a92b2f8-2c1d-4d5a-81f4-8b9876543210',
  })
  @IsString()
  userId: string;
}
