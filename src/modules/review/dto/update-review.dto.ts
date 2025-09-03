import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiPropertyOptional({
    description: 'Yangilangan sharh matni',
    example: 'Mahsulot sifati yaxshi, lekin yetkazib berish sekinroq bo‘ldi.',
  })
  content?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan baholash (1 dan 5 gacha)',
    example: 4,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan mahsulot ID (UUID)',
    example: '3f8a1c62-4f8b-47a2-97a1-9d1234567890',
  })
  productId?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan kategoriya ID (UUID)',
    example: '7a82c2f8-1b1c-4a5d-91d4-9a9876543210',
  })
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan foydalanuvchi ID (UUID)',
    example: '1a92b2f8-2c1d-4d5a-81f4-8b9876543210',
  })
  userId?: string;
}
