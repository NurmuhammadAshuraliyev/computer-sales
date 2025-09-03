import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private db: PrismaService) {}

  create(dto: CreateReviewDto) {
    return this.db.prisma.review.create({ data: dto });
  }

  findAll() {
    return this.db.prisma.review.findMany({
      include: { product: true, category: true, user: true },
    });
  }

  findOne(id: string) {
    return this.db.prisma.review.findUnique({
      where: { id },
      include: { product: true, category: true, user: true },
    });
  }

  update(id: string, dto: UpdateReviewDto) {
    return this.db.prisma.review.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.db.prisma.review.delete({ where: { id } });
  }
}
