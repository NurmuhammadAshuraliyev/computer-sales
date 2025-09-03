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
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Review')
@ApiBearerAuth() // 🔑 default bo‘yicha barcha endpointlarda token talab qilinadi
@Controller('admin/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Yangi review yaratish' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 200, description: 'Review muvaffaqiyatli yaratildi' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('get-all')
  @HttpCode(200)
  @SetMetadata('isPublic', true) // 🔓 GET → public
  @ApiOperation({ summary: 'Barcha reviewlarni olish' })
  @ApiResponse({ status: 200, description: 'Reviewlar ro‘yxati qaytarildi' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @SetMetadata('isPublic', true) // 🔓 GET → public
  @ApiOperation({ summary: 'Bitta reviewni olish' })
  @ApiParam({ name: 'id', description: 'Review ID', type: String })
  @ApiResponse({ status: 200, description: 'Review topildi' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reviewni yangilash' })
  @ApiParam({ name: 'id', description: 'Review ID', type: String })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Review muvaffaqiyatli yangilandi' })
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reviewni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Review ID', type: String })
  @ApiResponse({ status: 200, description: 'Review muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
