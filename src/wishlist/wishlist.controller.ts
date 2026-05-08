import {
  Controller, Get, Post, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@CurrentUser() user: CurrentUserPayload) {
    const wishlist = await this.wishlistService.getWishlist(user.id);
    return { data: wishlist, message: 'Wishlist fetched successfully' };
  }

  @Post()
  async addToWishlist(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { courseId: number },
  ) {
    const item = await this.wishlistService.addToWishlist(user.id, parseInt(String(body.courseId), 10));
    return { data: item, message: 'Added to wishlist' };
  }

  @Delete(':courseId')
  async removeFromWishlist(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.wishlistService.removeFromWishlist(user.id, courseId);
    return { data: deleted, message: `Course #${courseId} removed from wishlist` };
  }
}
