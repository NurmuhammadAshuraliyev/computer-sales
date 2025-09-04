import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Body,
  SetMetadata,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { randomBytes } from 'crypto';

import { CategoryItemService } from './category-item.service';
import { CreateCategoryItemDto } from './dto/create-category-item.dto';
import { UpdateCategoryItemDto } from './dto/update-category-item.dto';

import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'CategoryItemVideo');

const imageFileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: Function,
) => {
  const allowed = /\/(jpeg|jpg|png|webp|gif)$/i;
  if (!allowed.test(file.mimetype)) {
    return cb(
      new BadRequestException('Faqat rasm fayllari: jpeg, jpg, png, webp, gif'),
      false,
    );
  }
  cb(null, true);
};

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR))
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // .png
    const base = randomBytes(8).toString('hex');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

@ApiTags('Category Items')
@ApiBearerAuth()
@Controller('category-items')
export class CategoryItemController {
  constructor(private readonly service: CategoryItemService) {}

  // CREATE (multipart/form-data: fields + image)
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Yangi CategoryItem yaratish',
    schema: {
      type: 'object',
      required: ['name', 'categoryId'],
      properties: {
        name: { type: 'string', example: 'MacBook Air M1' },
        description: { type: 'string', example: 'Tez va yengil ultrabook' },
        price: { type: 'number', example: 999.99 },
        categoryId: {
          type: 'string',
          format: 'uuid',
          example: '9d9d7f9e-6b7a-4e1f-bb1b-4f8a2e0f0a12',
        },
        image: {
          // 🔴 fayl fieldi
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      // 🔴 nomi schema bilan aynan bir xil
      storage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() dto: CreateCategoryItemDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileName = file?.filename ?? undefined;
    return this.service.create(dto, fileName);
  }

  @Get()
  @SetMetadata('isPublic', true)
  @ApiResponse({ status: 200, description: 'Hamma CategoryItem lar' })
  async findAll() {
    return this.service.findAll();
  }

  // GET BY ID
  @Get(':id')
  @SetMetadata('isPublic', true)
  @ApiParam({ name: 'id', type: String, example: 'uuid' })
  @ApiResponse({ status: 200, description: 'Bitta CategoryItem' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE (ixtiyoriy yangi rasm bilan)
  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, example: 'uuid' })
  @ApiBody({
    description: 'CategoryItem yangilash',
    type: UpdateCategoryItemDto,
  })
  @ApiResponse({ status: 200, description: 'CategoryItem yangilandi' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryItemDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileName = file?.filename ?? undefined;
    return this.service.update(id, dto, fileName);
  }

  // DELETE
  @Delete('delete/:id')
  @ApiParam({ name: 'id', type: String, example: 'uuid' })
  @ApiResponse({ status: 200, description: 'CategoryItem o‘chirildi' })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
