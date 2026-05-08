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
exports.TrainerRequestService = void 0;
const common_1 = require("@nestjs/common");
const trainer_request_repository_1 = require("./trainer-request.repository");
const user_repository_1 = require("../user/user.repository");
const r2_service_1 = require("../common/storage/r2.service");
let TrainerRequestService = class TrainerRequestService {
    trainerRequestRepository;
    userRepository;
    r2Service;
    constructor(trainerRequestRepository, userRepository, r2Service) {
        this.trainerRequestRepository = trainerRequestRepository;
        this.userRepository = userRepository;
        this.r2Service = r2Service;
    }
    async submitRequest(userId, data, cvFile) {
        const existing = await this.trainerRequestRepository.findByUserId(userId);
        if (existing)
            throw new common_1.ConflictException('You already have a pending request');
        // Upload CV PDF to R2
        const cvUrl = await this.r2Service.uploadFile(cvFile, 'cv-documents');
        return this.trainerRequestRepository.create({ userId, cvUrl, ...data });
    }
    async getAllRequests(status) {
        return this.trainerRequestRepository.findAll(status);
    }
    async verifyTrainer(requestId, status) {
        const request = await this.trainerRequestRepository.findById(requestId);
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.status !== 'PENDING')
            throw new common_1.ConflictException('Request already processed');
        const updated = await this.trainerRequestRepository.updateStatus(requestId, status);
        if (status === 'APPROVED') {
            await this.userRepository.update(request.userId, { role: 'TRAINER' });
        }
        return updated;
    }
};
exports.TrainerRequestService = TrainerRequestService;
exports.TrainerRequestService = TrainerRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trainer_request_repository_1.TrainerRequestRepository,
        user_repository_1.UserRepository,
        r2_service_1.R2Service])
], TrainerRequestService);
//# sourceMappingURL=trainer-request.service.js.map