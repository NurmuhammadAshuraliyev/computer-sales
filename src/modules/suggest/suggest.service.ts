import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuggestDto } from './dto/create-suggest.dto';
import { UpdateSuggestDto } from './dto/update-suggest.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import path from 'path';
import fs from 'fs';

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
      },
    });
  }

  async findAll() {
    return this.db.prisma.suggest.findMany({
      include: { _count: { select: { reviews: true } } },
    });
  }

  async findByCategoryName(title: string) {
    return this.db.prisma.suggest.findMany({
      where: {
        title: { equals: title, mode: 'insensitive' }, // case-insensitive qidiruv
      },
      include: { _count: { select: { reviews: true } } },
    });
  }

  update(id: string, dto: UpdateSuggestDto) {
    return this.db.prisma.suggest.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.db.prisma.suggest.findUnique({ where: { id } });
    if (!exists) {
      throw new HttpException('Suggest topilmadi!', HttpStatus.NOT_FOUND);
    }

    const filePath = path.join(process.cwd(), 'uploads');

    if (exists.image) {
      const file = path.join(filePath, exists.image);

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
    return this.db.prisma.suggest.delete({ where: { id } });
  }
}
