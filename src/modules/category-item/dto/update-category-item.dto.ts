import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryItemDto } from './create-category-item.dto';
import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryItemDto extends PartialType(CreateCategoryItemDto) {
  @ApiPropertyOptional({
    example: '9d9d7f9e-6b7a-4e1f-bb1b-4f8a2e0f0a12',
    description: 'Yangi categoryId (UUID, ixtiyoriy)',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
