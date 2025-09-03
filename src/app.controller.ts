import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // Swagger'da guruhlash uchun
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Salomlashish endpointi' })
  @ApiResponse({ status: 200, description: 'Hello world qaytaradi' })
  getHello(): string {
    return this.appService.getHello();
  }
}
