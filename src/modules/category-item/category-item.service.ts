import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'CategoryItemVideo');

@Injectable()
export class CategoryItemService {
  constructor(private readonly db: PrismaService) {
    // Papkani oldindan yaratib qo'yamiz
    if (!fs.existsSync(UPLOAD_DIR))
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  private async ensureCategoryExists(categoryId: string) {
    const cat = await this.db.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!cat)
      throw new BadRequestException('categoryId noto‘g‘ri: Category topilmadi');
  }

  async create(dto: CreateCategoryItemDto, imageFileName?: string) {
    await this.ensureCategoryExists(dto.categoryId);

    return this.db.prisma.categoryItem.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        imageUrl: imageFileName, // faqat fayl nomi
        categoryId: dto.categoryId,
      },
    });
  }

  async findAll() {
    const data = this.db.prisma.categoryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!data) throw new NotFoundException('Malumot topilmadi.');

    return data;
  }

  async findOne(id: string) {
    const item = await this.db.prisma.categoryItem.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('CategoryItem topilmadi');
    return item;
  }

  async update(
    id: string,
    dto: UpdateCategoryItemDto,
    newImageFileName?: string,
  ) {
    const existing = await this.db.prisma.categoryItem.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('CategoryItem topilmadi');

    if (dto.categoryId) await this.ensureCategoryExists(dto.categoryId);

    // Agar yangi rasm yuklansa, eski faylni o‘chiramiz
    if (newImageFileName && existing.imageUrl) {
      const oldPath = path.join(UPLOAD_DIR, existing.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    return this.db.prisma.categoryItem.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        description: dto.description ?? existing.description,
        price: dto.price ?? existing.price,
        imageUrl: newImageFileName ?? existing.imageUrl,
        categoryId: dto.categoryId ?? existing.categoryId,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.db.prisma.categoryItem.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('CategoryItem topilmadi');

    // DBdan o‘chirishdan oldin faylni o‘chiramiz
    if (existing.imageUrl) {
      const filePath = path.join(UPLOAD_DIR, existing.imageUrl);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          // jim – fayl bo'lmasligi mumkin
        }
      }
    }

    await this.db.prisma.categoryItem.delete({ where: { id } });
    return { success: true };
  }
}
