import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(200)
  async getOrders() {
    try {
      return await this.orderService.getOrders();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/create')
  async createOrders(@Body() createOrderDto: CreateOrderDto[]) {
    try {
      await this.orderService.createOrders(createOrderDto);

      return { message: 'Malumotlar qoshildi.' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
