import { Module } from '@nestjs/common';
import { CategoryItemController } from './category-item.controller';
import { CategoryItemService } from './category-item.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [CategoryItemController],
  providers: [CategoryItemService, PrismaService],
  exports: [CategoryItemService],
})
export class CategoryItemModule {}
