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
exports.TrainerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trainer_service_1 = require("./trainer.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let TrainerController = class TrainerController {
    trainerService;
    constructor(trainerService) {
        this.trainerService = trainerService;
    }
    async getTrainerDashboard(user) {
        const dashboard = await this.trainerService.getDashboard(user.id);
        return { data: dashboard, message: 'Dashboard fetched successfully' };
    }
    async getTrainerSales(user) {
        const sales = await this.trainerService.getSales(user.id);
        return { data: sales, message: 'Sales data fetched successfully' };
    }
};
exports.TrainerController = TrainerController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({
        summary: '[TRAINER/ADMIN] Ambil ringkasan dashboard trainer',
        description: 'Mengembalikan statistik kursus yang dimiliki trainer: jumlah kursus, total siswa, total pendapatan, dan rating rata-rata.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data dashboard berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, bukan TRAINER atau ADMIN.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getTrainerDashboard", null);
__decorate([
    (0, common_1.Get)('sales'),
    (0, swagger_1.ApiOperation)({
        summary: '[TRAINER/ADMIN] Ambil laporan penjualan kursus trainer',
        description: 'Mengembalikan riwayat transaksi dan data pendapatan dari seluruh kursus yang dimiliki trainer.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data penjualan berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getTrainerSales", null);
exports.TrainerController = TrainerController = __decorate([
    (0, swagger_1.ApiTags)('Trainer'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('trainer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __metadata("design:paramtypes", [trainer_service_1.TrainerService])
], TrainerController);
//# sourceMappingURL=trainer.controller.js.map