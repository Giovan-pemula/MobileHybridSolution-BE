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
exports.TrainerRequestController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const trainer_request_service_1 = require("./trainer-request.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const trainerRequest_validation_1 = require("./trainerRequest.validation");
const multer_config_1 = require("../common/multer/multer.config");
const zod_1 = require("zod");
let TrainerRequestController = class TrainerRequestController {
    trainerRequestService;
    constructor(trainerRequestService) {
        this.trainerRequestService = trainerRequestService;
    }
    async submitTrainerRequest(user, body, cvFile) {
        if (!cvFile) {
            throw new common_1.BadRequestException('CV file (PDF) is required');
        }
        const request = await this.trainerRequestService.submitRequest(user.id, body, cvFile);
        return { data: request, message: 'Trainer request submitted' };
    }
    async getTrainerRequests(status) {
        const requests = await this.trainerRequestService.getAllRequests(status);
        return { data: requests, message: 'Trainer requests fetched successfully' };
    }
    async verifyTrainer(id, body) {
        const result = await this.trainerRequestService.verifyTrainer(id, body.status);
        return { data: result, message: `Trainer request ${body.status.toLowerCase()}` };
    }
};
exports.TrainerRequestController = TrainerRequestController;
__decorate([
    (0, common_1.Post)('trainer/request'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cv', (0, multer_config_1.documentUploadOptions)())),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(trainerRequest_validation_1.trainerRequestSchema))),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TrainerRequestController.prototype, "submitTrainerRequest", null);
__decorate([
    (0, common_1.Get)('admin/trainer-requests'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainerRequestController.prototype, "getTrainerRequests", null);
__decorate([
    (0, common_1.Patch)('admin/trainer/:id/verify'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(trainerRequest_validation_1.verifyTrainerSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TrainerRequestController.prototype, "verifyTrainer", null);
exports.TrainerRequestController = TrainerRequestController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [trainer_request_service_1.TrainerRequestService])
], TrainerRequestController);
//# sourceMappingURL=trainer-request.controller.js.map