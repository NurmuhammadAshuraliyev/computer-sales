import { Module } from '@nestjs/common';
import { CategoryService } from './categoriy.service';
import { CategoryController } from './categoriy.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriyModule {}
