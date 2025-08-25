import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { CategoriyService } from './categoriy.service';
import { CreateCategoriyDto } from './dto/create.cotegoriy.dto';

@Controller('/categoriy')
export class CategoriyController {
  constructor(private readonly categoriyService: CategoriyService) {}

  @Get()
  @HttpCode(200)
  async getCategory() {
    try {
      const { data } = await this.categoriyService.getCategory();

      return { data };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('create')
  @HttpCode(200)
  async createCategoriy(@Body() createCategoriyDto: CreateCategoriyDto[]) {
    await this.categoriyService.createCategory(createCategoriyDto);

    return { message: 'Malumot qoshildi.' };
  }
}
