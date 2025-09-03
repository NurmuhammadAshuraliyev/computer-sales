import { PartialType } from '@nestjs/swagger';
import { CreateSuggestDto } from './create-suggest.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSuggestDto extends PartialType(CreateSuggestDto) {
  @ApiPropertyOptional({
    description: 'Yangilangan suggest nomi',
    example: 'MacBook Air M2',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan narx',
    example: 1400,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan baho (rating)',
    example: 4.8,
  })
  rate?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan chegirma foizi',
    example: 15,
  })
  discount?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan qo‘shimcha izoh',
    example: 'Eng so‘nggi model, 18GB RAM',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan rasm nomi',
    example: '1693671289-987654321.png',
  })
  image?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan kategoriya ID (UUID)',
    example: '5d22e2f8-1b1c-4a5d-91d4-7a1234567890',
  })
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan foydalanuvchi ID (UUID)',
    example: '1a92b2f8-2c1d-4d5a-81f4-8b9876543210',
  })
  userId?: string;
}
