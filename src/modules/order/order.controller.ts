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
      const { data } = await this.orderService.getOrders();

      return { data };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/create')
  async createOrders() {
    try {
      await this.orderService.createOrders();

      return { message: 'Malumotlar qoshildi.' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
