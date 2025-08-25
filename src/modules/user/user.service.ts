import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateUserDto } from './dto/udate.user.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async update(updateUserDto: UpdateUserDto, userId: string) {
    const query: Partial<User> = {};

    const findUser = await this.db.prisma.user.findUnique({
      where: { id: userId },
    });

    if (
      updateUserDto.username &&
      (await this.db.prisma.user.findFirst({
        where: {
          AND: [
            { username: updateUserDto.username },
            {
              NOT: {
                id: userId,
              },
            },
          ],
        },
      }))
    ) {
      throw new ConflictException('Bu username mavjud.');
    } else {
      query.username = updateUserDto.username;
    }

    if (
      updateUserDto.phoneNumber &&
      (await this.db.prisma.user.findFirst({
        where: {
          AND: [
            { phoneNumber: updateUserDto.phoneNumber },
            { NOT: { id: userId } },
          ],
        },
      }))
    ) {
      throw new ConflictException('Bu phoneNumber mavjud.');
    } else {
      query.phoneNumber = updateUserDto.phoneNumber;
    }

    if (updateUserDto.password) {
      if (updateUserDto.new_password) {
        if (
          await bcrypt.compare(updateUserDto.password!, findUser?.password!)
        ) {
          query.password = await bcrypt.hash(updateUserDto.new_password!, 12);
        } else throw new BadRequestException('Password xato');
      }
    }

    if (updateUserDto.firstName) {
      query.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      query.lastName = updateUserDto.lastName;
    }

    const user = await this.db.prisma.user.update({
      where: { id: userId },
      data: query,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;

    // if (updateUserDto.new_password) {
    //   const compoirPassword = await bcrypt.compare(
    //     updateUserDto.password!,
    //     findUser!.password,
    //   );

    //   if (!compoirPassword) {
    //     throw new BadRequestException('Eski password hato.');
    //   }

    //   const hashPassword = await bcrypt.hash(updateUserDto.new_password!, 12);

    //   const { new_password, ...data } = updateUserDto;

    //   const user = await this.db.prisma.user.update({
    //     where: { id: userId },
    //     data: { ...data, password: hashPassword },
    //     select: {
    //       id: true,
    //       firstName: true,
    //       lastName: true,
    //       username: true,
    //       phoneNumber: true,
    //     },
    //   });

    //   return user;
    // } else {
    //   if (updateUserDto.password) {
    //     const hashPassword = await bcrypt.hash(updateUserDto.password!, 12);

    //     const user = await this.db.prisma.user.update({
    //       where: { id: userId },
    //       data: {
    //         ...updateUserDto,
    //         password: hashPassword,
    //       },
    //       select: {
    //         id: true,
    //         firstName: true,
    //         lastName: true,
    //         username: true,
    //         phoneNumber: true,
    //       },
    //     });

    //     return user;
    //   } else {
    //     const user = await this.db.prisma.user.update({
    //       where: { id: userId },
    //       data: {
    //         ...updateUserDto,
    //       },
    //       select: {
    //         id: true,
    //         firstName: true,
    //         lastName: true,
    //         username: true,
    //         phoneNumber: true,
    //       },
    //     });

    //     return user;
    //   }
    // }
  }
}
