import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { message, token } = await this.authService.register(registerDto);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 48 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });

      return { message, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { message, token } = await this.authService.login(loginDto);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 48 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });

      return { message, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('me')
  @HttpCode(200)
  async me(@Req() req: Request) {
    try {
      const token = req.cookies['token'];

      const data = await this.authService.me(token);

      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
