import { wishlistRepository } from '../repositories/wishlist.repository';

export class WishlistService {
  async getWishlist(userId: number) {
    return wishlistRepository.findByUser(userId);
  }

  async addToWishlist(userId: number, courseId: number) {
    const existing = await wishlistRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new Error('ALREADY_IN_WISHLIST');
    return wishlistRepository.create(userId, courseId);
  }

  async removeFromWishlist(userId: number, courseId: number) {
    const existing = await wishlistRepository.findByUserAndCourse(userId, courseId);
    if (!existing) throw new Error('NOT_IN_WISHLIST');
    await wishlistRepository.delete(userId, courseId);
  }
}

export const wishlistService = new WishlistService();
