import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create.cotegoriy.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import fs from 'fs';
import path from 'path';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const findTitle = await this.db.prisma.category.findUnique({
      where: { title: dto.title },
    });

    if (findTitle) throw new ConflictException('Bu category mavjud.');

    const s = await this.db.prisma.category.create({
      data: {
        title: dto.title,
        price: dto.price,
        imageUrl: dto.imageUrl,
      },
    });

    return s;
  }

  async findAll() {
    const data = await this.db.prisma.category.findMany({
      include: {
        _count: { select: { items: true, reviews: true } },
      },
    });

    return { data };
  }

  async findByTitle(title: string) {
    const data = await this.db.prisma.category.findMany({
      where: { title: { equals: title, mode: 'insensitive' } }, // case-insensitive qidiruv
      include: {
        _count: { select: { items: true, reviews: true } },
      },
    });

    if (!data.length) {
      throw new HttpException('Category topilmadi!', HttpStatus.NOT_FOUND);
    }

    return { data };
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

    const filePath = path.join(process.cwd(), 'uploads');

    if (exists.imageUrl) {
      const file = path.join(filePath, exists.imageUrl);

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
    return this.db.prisma.category.delete({ where: { id } });
  }
}
