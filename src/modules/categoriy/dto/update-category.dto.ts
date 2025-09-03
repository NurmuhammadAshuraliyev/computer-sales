import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create.cotegoriy.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    description: 'Yangilangan kategoriya nomi',
    example: 'Maishiy texnika',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan narx (ixtiyoriy)',
    example: 2000,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan rasm nomi (faqat fayl nomi)',
    example: '1693671289-123456789.png',
  })
  imageUrl?: string;
}
