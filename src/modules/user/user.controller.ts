import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/udate.user.dto';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth() // 🔑 token talab qiladi
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @HttpCode(200)
  @ApiOperation({ summary: 'Foydalanuvchi ma’lumotlarini yangilash' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli yangilandi',
  })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi' })
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    try {
      const userId = req['userId'];
      const user = await this.userService.update(updateUserDto, userId);
      return { user };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
