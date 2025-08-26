import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateOrderDto } from './dto/create.order.dto';
import path from 'path';
import fs from 'fs/promises';

@Injectable()
export class OrderService {
  constructor(private readonly db: PrismaService) {}

  async getOrders() {
    const data = await this.db.prisma.orders.findMany();

    if (!data) throw new ConflictException('Information not found.');

    return data;
  }

  async createOrders(createOrderDto: CreateOrderDto[]) {
    return await this.db.prisma.orders.createMany({ data: createOrderDto });
  }
}
