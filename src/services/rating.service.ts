import { ratingRepository } from '../repositories/rating.repository';

export class RatingService {
  async getCourseRatings(courseId: number) {
    return ratingRepository.findByCourse(courseId);
  }

  async createRating(userId: number, courseId: number, data: { rating: number; review?: string }) {
    const existing = await ratingRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new Error('ALREADY_RATED');
    return ratingRepository.create({ userId, courseId, ...data });
  }

  async updateRating(id: number, userId: number, data: { rating?: number; review?: string }) {
    const rating = await ratingRepository.findById(id);
    if (!rating) throw new Error('RATING_NOT_FOUND');
    if (rating.userId !== userId) throw new Error('FORBIDDEN');
    return ratingRepository.update(id, data);
  }

  async deleteRating(id: number, userId: number) {
    const rating = await ratingRepository.findById(id);
    if (!rating) throw new Error('RATING_NOT_FOUND');
    if (rating.userId !== userId) throw new Error('FORBIDDEN');
    await ratingRepository.delete(id);
  }
}

export const ratingService = new RatingService();
