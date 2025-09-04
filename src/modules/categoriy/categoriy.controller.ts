import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  SetMetadata,
  HttpException,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './categoriy.service';
import { CreateCategoryDto } from './dto/create.cotegoriy.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path, { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
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

@ApiTags('Category')
@ApiBearerAuth()
@Controller('admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Yangi category yaratish (rasm bilan yoki rasmsiz)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Elektronika' },
        price: { type: 'number', example: 1500 },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Category muvaffaqiyatli yaratildi',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuid();
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        dto.imageUrl = file.filename;
      }

      return await this.categoryService.create(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Category yaratishda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(200)
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'Categorylarni olish (hammasi yoki title bo‘yicha)',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'Category title',
  })
  @ApiResponse({ status: 200, description: 'Categorylar ro‘yxati qaytarildi' })
  async find(@Query('title') title?: string) {
    try {
      if (title) {
        const category = await this.categoryService.findByTitle(title);
        if (!category) {
          throw new HttpException('Category topilmadi!', HttpStatus.NOT_FOUND);
        }
        return category;
      }
      return await this.categoryService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Categorylarni olishda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Categoryni yangilash' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category muvaffaqiyatli yangilandi',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        // Fayl nomini DTO ga o‘rnatamiz
        dto.imageUrl = file.filename;
      }
      return await this.categoryService.update(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Category yangilashda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Categoryni o‘chirish' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category muvaffaqiyatli o‘chirildi',
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Category o‘chirishda xatolik!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
