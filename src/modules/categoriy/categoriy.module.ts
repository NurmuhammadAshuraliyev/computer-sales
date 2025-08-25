import { Module } from '@nestjs/common';
import { CategoriyController } from './categoriy.controller';
import { CategoriyService } from './categoriy.service';

@Module({
  controllers: [CategoriyController],
  providers: [CategoriyService],
})
export class CategoriyModule {}
