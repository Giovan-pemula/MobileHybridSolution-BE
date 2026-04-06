import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(private readonly wishlistRepository: WishlistRepository) {}

  async getWishlist(userId: number) {
    return this.wishlistRepository.findByUser(userId);
  }

  async addToWishlist(userId: number, courseId: number) {
    if (!courseId || isNaN(courseId)) throw new BadRequestException('courseId is required');
    const existing = await this.wishlistRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new ConflictException('Course already in wishlist');
    return this.wishlistRepository.create(userId, courseId);
  }

  async removeFromWishlist(userId: number, courseId: number) {
    const existing = await this.wishlistRepository.findByUserAndCourse(userId, courseId);
    if (!existing) throw new NotFoundException('Course not in wishlist');
    await this.wishlistRepository.delete(userId, courseId);
  }
}
