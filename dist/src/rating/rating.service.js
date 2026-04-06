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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const rating_repository_1 = require("./rating.repository");
let RatingService = class RatingService {
    ratingRepository;
    constructor(ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
    async getCourseRatings(courseId) {
        return this.ratingRepository.findByCourse(courseId);
    }
    async createRating(userId, courseId, data) {
        const existing = await this.ratingRepository.findByUserAndCourse(userId, courseId);
        if (existing)
            throw new common_1.ConflictException('You have already rated this course');
        return this.ratingRepository.create({ userId, courseId, ...data });
    }
    async updateRating(id, userId, data) {
        const rating = await this.ratingRepository.findById(id);
        if (!rating)
            throw new common_1.NotFoundException('Rating not found');
        if (rating.userId !== userId)
            throw new common_1.ForbiddenException('You can only edit your own rating');
        return this.ratingRepository.update(id, data);
    }
    async deleteRating(id, userId) {
        const rating = await this.ratingRepository.findById(id);
        if (!rating)
            throw new common_1.NotFoundException('Rating not found');
        if (rating.userId !== userId)
            throw new common_1.ForbiddenException('You can only delete your own rating');
        await this.ratingRepository.delete(id);
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rating_repository_1.RatingRepository])
], RatingService);
//# sourceMappingURL=rating.service.js.map