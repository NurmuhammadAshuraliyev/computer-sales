import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create.cotegoriy.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const s = await this.db.prisma.category.create({
      data: {
        title: dto.title,
        price: dto.price ?? null,
        imageUrl: dto.imageUrl ?? null,
      },
    });

    return s;
  }

  async findAll() {
    const data = await this.db.prisma.category.findMany({
      include: { products: true, reviews: true },
    });
    const count = await this.db.prisma.category.count();

    return { data, count };
  }

  async findByTitle(title: string) {
    const data = await this.db.prisma.category.findMany({
      where: { title: { equals: title, mode: 'insensitive' } }, // case-insensitive qidiruv
      include: { products: true, reviews: true },
    });

    if (!data.length) {
      throw new HttpException('Category topilmadi!', HttpStatus.NOT_FOUND);
    }

    return { data, count: data.length };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const exists = await this.db.prisma.category.findUnique({ where: { id } });
    if (!exists) {
      throw new HttpException('Category topilmadi!', HttpStatus.NOT_FOUND);
    }

    return this.db.prisma.category.update({
      where: { id },
      data: {
        title: dto.title ?? exists.title,
        price: dto.price ?? exists.price,
        imageUrl: dto.imageUrl ?? exists.imageUrl,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.db.prisma.category.findUnique({ where: { id } });
    if (!exists) {
      throw new HttpException('Category topilmadi!', HttpStatus.NOT_FOUND);
    }

    return this.db.prisma.category.delete({ where: { id } });
  }
}
