import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createRatingSchema, updateRatingSchema } from './rating.validation';
import { z } from 'zod';

@Controller()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('courses/:courseId/ratings')
  async getCourseRatings(@Param('courseId', ParseIntPipe) courseId: number) {
    const ratings = await this.ratingService.getCourseRatings(courseId);
    return { data: ratings, message: 'Ratings fetched successfully' };
  }

  @Post('courses/:courseId/rating')
  @UseGuards(JwtAuthGuard)
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
  async deleteRating(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    await this.ratingService.deleteRating(id, user.id);
    return { data: null, message: 'Rating deleted successfully' };
  }
}
