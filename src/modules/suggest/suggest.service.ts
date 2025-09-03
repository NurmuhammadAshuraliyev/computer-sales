import { Injectable } from '@nestjs/common';
import { CreateSuggestDto } from './dto/create-suggest.dto';
import { UpdateSuggestDto } from './dto/update-suggest.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SuggestService {
  constructor(private db: PrismaService) {}
  async create(dto: CreateSuggestDto) {
    return this.db.prisma.suggest.create({
      data: {
        title: dto.title,
        price: dto.price,
        rate: dto.rate ?? null,
        discount: dto.discount ?? null,
        description: dto.description ?? null,
        image: dto.image ?? null,
        categoryId: dto.categoryId,
        userId: dto.userId,
      },
      include: { category: true, user: true },
    });
  }

  async findAll() {
    return this.db.prisma.suggest.findMany({
      include: { category: true, user: true, reviews: true },
    });
  }

  async findByCategoryName(category: string) {
    return this.db.prisma.suggest.findMany({
      where: {
        category: { title: { equals: category, mode: 'insensitive' } }, // case-insensitive qidiruv
      },
      include: { category: true, user: true, reviews: true },
    });
  }

  update(id: string, dto: UpdateSuggestDto) {
    return this.db.prisma.suggest.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.db.prisma.suggest.delete({ where: { id } });
  }
}
