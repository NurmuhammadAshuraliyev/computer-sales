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

  // imageUrl endi faqat server tomonidan o‘rnatiladi
  imageUrl?: string;
}
