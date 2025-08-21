import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const findUsername = await this.db.prisma.user.findUnique({
      where: { username: registerDto.username },
    });

    if (findUsername) throw new ConflictException('This username exists.');

    const hashPassword = await bcrypt.hash(registerDto.password, 12);

    const user = await this.db.prisma.user.create({
      data: {
        ...registerDto,
        password: hashPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        username: true,
      },
    });

    const token = await this.jwtService.signAsync({ userId: user.id });

    return { message: 'Siz muvaffaqiyatli ravishda o‘tdingiz.', token, user };
  }

  async login(loginDto: LoginDto) {
    const findUsername = await this.db.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });

    if (!findUsername)
      throw new NotFoundException('Username or password error.');

    const comparePassword = await bcrypt.compare(
      loginDto.password,
      findUsername.password,
    );

    if (!comparePassword)
      throw new NotFoundException('Username or password error.');

    const token = await this.jwtService.signAsync({ userId: findUsername.id });

    const data = {
      ...findUsername,
      password: '',
    };

    return { message: 'Siz muvaffaqiyatli tizimga kirdingiz.', token, data };
  }

  async me(token: string) {
    const { userId } = await this.jwtService.verifyAsync(token);

    if (!userId) throw new NotFoundException('Token not found.');

    const user = await this.db.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        phoneNumber: true,
      },
    });

    if (!user) throw new NotFoundException('Information not found.');

    return user;
  }
}
