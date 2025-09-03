import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: 'Ro‘yxatdan o‘tish muvaffaqiyatli' })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { message, token, user } =
        await this.authService.register(registerDto);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 48 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });

      return { message, token, user };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  @HttpCode(200)
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kirishi' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login muvaffaqiyatli' })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { message, token, user } = await this.authService.login(loginDto);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 48 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
        domain: 'localhost',
      });

      return { message, token, user };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('me')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tizimga kirgan foydalanuvchi ma’lumotini olish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi ma’lumotlari qaytarildi',
  })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  async me(@Req() req: Request) {
    try {
      const userId = req['userId'];
      const user = await this.authService.me(userId);
      return { user };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
