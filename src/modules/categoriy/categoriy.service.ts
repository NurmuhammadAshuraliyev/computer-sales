import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCategoriyDto } from './dto/create.cotegoriy.dto';

@Injectable()
export class CategoriyService {
  constructor(private readonly db: PrismaService) {}

  async getCategory() {
    const data = await this.db.prisma.categoriy.findMany();

    if (!data) throw new Notification('Information not fount.');

    return { data };
  }

  async createCategory(createCategoriyDto: CreateCategoriyDto[]) {
    await this.db.prisma.categoriy.createMany({
      data: createCategoriyDto,
    });
  }
}
