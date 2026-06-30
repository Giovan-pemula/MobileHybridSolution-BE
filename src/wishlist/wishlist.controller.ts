import {
  Controller, Get, Post, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

class AddWishlistDto {
  @ApiProperty({ example: 1, description: 'ID kursus yang ingin ditambahkan ke wishlist' })
  courseId: number;
}

@ApiTags('Wishlist')
@ApiBearerAuth('access-token')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua kursus dalam wishlist pengguna yang login' })
  @ApiResponse({ status: 200, description: 'Wishlist berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getWishlist(@CurrentUser() user: CurrentUserPayload) {
    const wishlist = await this.wishlistService.getWishlist(user.id);
    return { data: wishlist, message: 'Wishlist fetched successfully' };
  }

  @Post()
  @ApiOperation({ summary: 'Tambah kursus ke wishlist' })
  @ApiBody({ type: AddWishlistDto })
  @ApiResponse({ status: 201, description: 'Kursus berhasil ditambahkan ke wishlist.' })
  @ApiResponse({ status: 409, description: 'Kursus sudah ada di wishlist.' })
  async addToWishlist(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { courseId: number },
  ) {
    const item = await this.wishlistService.addToWishlist(user.id, parseInt(String(body.courseId), 10));
    return { data: item, message: 'Added to wishlist' };
  }

  @Delete(':courseId')
  @ApiOperation({ summary: 'Hapus kursus dari wishlist' })
  @ApiParam({ name: 'courseId', description: 'ID kursus yang ingin dihapus dari wishlist' })
  @ApiResponse({ status: 200, description: 'Kursus berhasil dihapus dari wishlist.' })
  async removeFromWishlist(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.wishlistService.removeFromWishlist(user.id, courseId);
    return { data: deleted, message: `Course #${courseId} removed from wishlist` };
  }
}
