import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createRatingSchema, updateRatingSchema } from './rating.validation';
import { z } from 'zod';

class CreateRatingDto {
  @ApiProperty({ example: 5, description: 'Nilai rating antara 1 sampai 5' }) rating: number;
  @ApiProperty({ example: 'Kursus sangat bagus!', required: false })           comment?: string;
}
class UpdateRatingDto {
  @ApiProperty({ example: 4, required: false })                    rating?: number;
  @ApiProperty({ example: 'Materinya sudah diperbarui.', required: false }) comment?: string;
}

@ApiTags('Ratings')
@Controller()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('courses/:courseId/ratings')
  @ApiOperation({ summary: 'Ambil semua rating dari sebuah kursus' })
  @ApiParam({ name: 'courseId', description: 'ID kursus' })
  @ApiResponse({ status: 200, description: 'Ratings berhasil diambil.' })
  async getCourseRatings(@Param('courseId', ParseIntPipe) courseId: number) {
    const ratings = await this.ratingService.getCourseRatings(courseId);
    return { data: ratings, message: 'Ratings fetched successfully' };
  }

  @Post('courses/:courseId/rating')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Beri rating pada kursus', description: 'Hanya pengguna yang sudah enrolled yang dapat memberi rating.' })
  @ApiParam({ name: 'courseId', description: 'ID kursus' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({ status: 201, description: 'Rating berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async createRating(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createRatingSchema)) body: z.infer<typeof createRatingSchema>,
  ) {
    const rating = await this.ratingService.createRating(user.id, courseId, body);
    return { data: rating, message: 'Rating created successfully' };
  }

  @Patch('ratings/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update rating milik sendiri' })
  @ApiParam({ name: 'id', description: 'ID rating' })
  @ApiBody({ type: UpdateRatingDto })
  @ApiResponse({ status: 200, description: 'Rating berhasil diperbarui.' })
  async updateRating(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateRatingSchema)) body: z.infer<typeof updateRatingSchema>,
  ) {
    const rating = await this.ratingService.updateRating(id, user.id, body);
    return { data: rating, message: 'Rating updated successfully' };
  }

  @Delete('ratings/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Hapus rating milik sendiri' })
  @ApiParam({ name: 'id', description: 'ID rating' })
  @ApiResponse({ status: 200, description: 'Rating berhasil dihapus.' })
  async deleteRating(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.ratingService.deleteRating(id, user.id);
    return { data: deleted, message: `Rating for course #${deleted.courseId} deleted successfully` };
  }
}
