import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { SuggestService } from './suggest.service';
import { CreateSuggestDto } from './dto/create-suggest.dto';
import { UpdateSuggestDto } from './dto/update-suggest.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Suggest')
@ApiBearerAuth()
@Controller('admin/suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Yangi suggest yaratish (rasm bilan yoki rasmiz)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'MacBook Pro' },
        price: { type: 'number', example: 1200 },
        rate: { type: 'number', example: 4.5 },
        categoryId: { type: 'string', example: 'uuid-kategoriya-id' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Suggest muvaffaqiyatli yaratildi' })
  async create(
    @Body() dto: CreateSuggestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        dto.image = file.filename;
      }
      return await this.suggestService.create(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Suggest yaratishda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(200)
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'Suggestlarni olish (hammasi yoki kategoriya bo‘yicha)',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Kategoriya nomi',
  })
  @ApiResponse({ status: 200, description: 'Suggestlar ro‘yxati' })
  async find(@Query('category') category?: string) {
    try {
      if (category) {
        const data = await this.suggestService.findByCategoryName(category);
        if (!data.length) {
          throw new HttpException(
            'Ushbu kategoriya bo‘yicha suggest topilmadi!',
            HttpStatus.NOT_FOUND,
          );
        }
        return { data, count: data.length };
      }

      const all = await this.suggestService.findAll();
      return { data: all, count: all.length };
    } catch (error) {
      throw new HttpException(
        error.message || 'Suggestlarni olishda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Suggestni yangilash' })
  @ApiParam({ name: 'id', description: 'Suggest ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Suggest muvaffaqiyatli yangilandi',
  })
  update(@Param('id') id: string, @Body() dto: UpdateSuggestDto) {
    return this.suggestService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Suggestni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Suggest ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Suggest muvaffaqiyatli o‘chirildi',
  })
  remove(@Param('id') id: string) {
    return this.suggestService.remove(id);
  }
}
