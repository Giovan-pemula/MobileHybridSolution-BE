import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { RatingRepository } from './rating.repository';

@Injectable()
export class RatingService {
  constructor(private readonly ratingRepository: RatingRepository) {}

  async getCourseRatings(courseId: number) {
    return this.ratingRepository.findByCourse(courseId);
  }

  async createRating(userId: number, courseId: number, data: { rating: number; review?: string }) {
    const existing = await this.ratingRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new ConflictException('You have already rated this course');
    return this.ratingRepository.create({ userId, courseId, ...data });
  }

  async updateRating(id: number, userId: number, data: { rating?: number; review?: string }) {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) throw new NotFoundException('Rating not found');
    if (rating.userId !== userId) throw new ForbiddenException('You can only edit your own rating');
    return this.ratingRepository.update(id, data);
  }

  async deleteRating(id: number, userId: number) {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) throw new NotFoundException('Rating not found');
    if (rating.userId !== userId) throw new ForbiddenException('You can only delete your own rating');
    return this.ratingRepository.delete(id);
  }
}
