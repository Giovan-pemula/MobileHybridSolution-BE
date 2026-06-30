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
const swagger_1 = require("@nestjs/swagger");
const trainer_request_service_1 = require("./trainer-request.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const trainerRequest_validation_1 = require("./trainerRequest.validation");
const multer_config_1 = require("../common/multer/multer.config");
const zod_1 = require("zod");
class SubmitTrainerRequestDto {
    motivation;
    cv;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saya adalah trainer berpengalaman dengan 5 tahun pengalaman.', description: 'Deskripsi motivasi menjadi trainer' }),
    __metadata("design:type", String)
], SubmitTrainerRequestDto.prototype, "motivation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'File CV dalam format PDF' }),
    __metadata("design:type", Object)
], SubmitTrainerRequestDto.prototype, "cv", void 0);
class VerifyTrainerDto {
    status;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APPROVED', enum: ['APPROVED', 'REJECTED'], description: 'Keputusan verifikasi trainer' }),
    __metadata("design:type", String)
], VerifyTrainerDto.prototype, "status", void 0);
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
    (0, swagger_1.ApiOperation)({ summary: 'Ajukan permintaan menjadi trainer', description: 'Upload CV (PDF) beserta motivasi. Gunakan `multipart/form-data`.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: SubmitTrainerRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Permohonan trainer berhasil diajukan.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'File CV (PDF) wajib disertakan.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
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
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Ambil semua permohonan trainer', description: 'Dapat difilter berdasarkan status: PENDING, APPROVED, REJECTED.' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'], description: 'Filter berdasarkan status permohonan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar permohonan trainer berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, bukan ADMIN.' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainerRequestController.prototype, "getTrainerRequests", null);
__decorate([
    (0, common_1.Patch)('admin/trainer/:id/verify'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Setujui atau tolak permohonan trainer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID user yang mengajukan permohonan trainer' }),
    (0, swagger_1.ApiBody)({ type: VerifyTrainerDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status permohonan berhasil diubah.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, bukan ADMIN.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(trainerRequest_validation_1.verifyTrainerSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TrainerRequestController.prototype, "verifyTrainer", null);
exports.TrainerRequestController = TrainerRequestController = __decorate([
    (0, swagger_1.ApiTags)('Trainer Request'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [trainer_request_service_1.TrainerRequestService])
], TrainerRequestController);
//# sourceMappingURL=trainer-request.controller.js.map