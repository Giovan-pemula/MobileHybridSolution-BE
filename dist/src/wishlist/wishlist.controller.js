"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wishlist_service_1 = require("./wishlist.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
class AddWishlistDto {
    courseId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID kursus yang ingin ditambahkan ke wishlist' }),
    __metadata("design:type", Number)
], AddWishlistDto.prototype, "courseId", void 0);
let WishlistController = class WishlistController {
    wishlistService;
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    async getWishlist(user) {
        const wishlist = await this.wishlistService.getWishlist(user.id);
        return { data: wishlist, message: 'Wishlist fetched successfully' };
    }
    async addToWishlist(user, body) {
        const item = await this.wishlistService.addToWishlist(user.id, parseInt(String(body.courseId), 10));
        return { data: item, message: 'Added to wishlist' };
    }
    async removeFromWishlist(courseId, user) {
        const deleted = await this.wishlistService.removeFromWishlist(user.id, courseId);
        return { data: deleted, message: `Course #${courseId} removed from wishlist` };
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua kursus dalam wishlist pengguna yang login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wishlist berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah kursus ke wishlist' }),
    (0, swagger_1.ApiBody)({ type: AddWishlistDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kursus berhasil ditambahkan ke wishlist.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Kursus sudah ada di wishlist.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Delete)(':courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus kursus dari wishlist' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID kursus yang ingin dihapus dari wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kursus berhasil dihapus dari wishlist.' }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "removeFromWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, swagger_1.ApiTags)('Wishlist'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('wishlist'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map