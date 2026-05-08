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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const wishlist_repository_1 = require("./wishlist.repository");
let WishlistService = class WishlistService {
    wishlistRepository;
    constructor(wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }
    async getWishlist(userId) {
        return this.wishlistRepository.findByUser(userId);
    }
    async addToWishlist(userId, courseId) {
        if (!courseId || isNaN(courseId))
            throw new common_1.BadRequestException('courseId is required');
        const existing = await this.wishlistRepository.findByUserAndCourse(userId, courseId);
        if (existing)
            throw new common_1.ConflictException('Course already in wishlist');
        return this.wishlistRepository.create(userId, courseId);
    }
    async removeFromWishlist(userId, courseId) {
        const existing = await this.wishlistRepository.findByUserAndCourse(userId, courseId);
        if (!existing)
            throw new common_1.NotFoundException('Course not in wishlist');
        return this.wishlistRepository.delete(userId, courseId);
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wishlist_repository_1.WishlistRepository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map