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

    return { data };
  }

  async createOrders() {
    const imagePath = path.join(process.cwd(), 'upload');

    const data = [
      {
        title:
          'Apple Macbook Pro 16 2019 / i7 / 16GB / SSD 512GB / AMD Radeon Pro 5300M, kulrang',
        price: 30689010,
        imageUrl: `${imagePath}/Apple-Macbook-Pro-162019.avif`,
      },
      {
        title: 'Macbook Air 13inch M1 8/256gb ',
        price: 8314020,
        imageUrl: `${imagePath}/Macbook-Air-13inch-M1.avif`,
      },
      {
        title: 'Apple MacBook Pro 16 M4 Max',
        price: 50490000,
        imageUrl: `${imagePath}/Apple-MacBook-Pro-16-M4-Max.avif`,
      },
      {
        title:
          'Noutbuk Apple MacBook Pro 16" (2023) / M2 Pro 12 protsessor / 16 GB / SSD 1 TB / macOS / 16,2", Space Grey',
        price: 28421250,
        imageUrl: `${imagePath}/Noutbuk-Apple-MacBook-Pro-16.avif`,
      },
      {
        title:
          'Noutbuk Apple MacBook Pro 16 (2023) M3 Max / Apple M3 Max 16 protsessor / 36 GB / SSD 4 TB / macOS / 16.2", Space Grey',
        price: 100425000,
        imageUrl: `${imagePath}/Noutbuk-Apple-MacBook-Pro-16-(2023)-M3-Max.avif`,
      },
    ];

    return await this.db.prisma.orders.createMany({ data: data });
  }
}
