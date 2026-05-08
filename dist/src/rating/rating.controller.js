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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const rating_validation_1 = require("./rating.validation");
const zod_1 = require("zod");
let RatingController = class RatingController {
    ratingService;
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async getCourseRatings(courseId) {
        const ratings = await this.ratingService.getCourseRatings(courseId);
        return { data: ratings, message: 'Ratings fetched successfully' };
    }
    async createRating(courseId, user, body) {
        const rating = await this.ratingService.createRating(user.id, courseId, body);
        return { data: rating, message: 'Rating created successfully' };
    }
    async updateRating(id, user, body) {
        const rating = await this.ratingService.updateRating(id, user.id, body);
        return { data: rating, message: 'Rating updated successfully' };
    }
    async deleteRating(id, user) {
        const deleted = await this.ratingService.deleteRating(id, user.id);
        return { data: deleted, message: `Rating for course #${deleted.courseId} deleted successfully` };
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Get)('courses/:courseId/ratings'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getCourseRatings", null);
__decorate([
    (0, common_1.Post)('courses/:courseId/rating'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(rating_validation_1.createRatingSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "createRating", null);
__decorate([
    (0, common_1.Patch)('ratings/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(rating_validation_1.updateRatingSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "updateRating", null);
__decorate([
    (0, common_1.Delete)('ratings/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "deleteRating", null);
exports.RatingController = RatingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map