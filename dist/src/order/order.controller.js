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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const order_validation_1 = require("./order.validation");
const zod_1 = require("zod");
class CreateOrderDto {
    courseIds;
    couponId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], description: 'Array ID kursus yang ingin dibeli', type: [Number] }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "courseIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DISC10', description: 'Kode kupon diskon (opsional)', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "couponId", void 0);
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrders(user) {
        const orders = await this.orderService.getOrders(user.id);
        return { data: orders, message: 'Orders fetched successfully' };
    }
    async getAllOrdersWithRevenue() {
        const orders = await this.orderService.getAllOrdersForAdmin();
        return { data: orders, message: 'Admin orders with revenue fetched successfully' };
    }
    async createOrder(user, body) {
        const order = await this.orderService.createOrder(user.id, body.courseIds, body.couponId);
        return { data: order, message: 'Order created successfully' };
    }
    async previewOrder(user, body) {
        const summary = await this.orderService.previewOrder(user.id, body.courseIds, body.couponId);
        return { data: summary, message: 'Order preview calculated successfully' };
    }
    async bypassPayment(user, orderId) {
        const result = await this.orderService.bypassPayment(orderId, user.id);
        return { data: result, message: 'Order successfully bypassed and paid' };
    }
    async handleWebhook(payload) {
        const result = await this.orderService.handleWebhook(payload);
        return { data: result, message: 'Webhook processed successfully' };
    }
    async getPaymentStatus(user, orderId) {
        const order = await this.orderService.syncPaymentStatus(user.id, orderId);
        return { data: order, message: 'Payment status fetched successfully' };
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil riwayat order pengguna yang login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar order berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('admin/revenue'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Ambil semua order beserta data revenue' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data revenue berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, bukan ADMIN.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrdersWithRevenue", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Buat order baru (checkout kursus berbayar)', description: 'Membuat pesanan untuk satu atau lebih kursus berbayar. Mengembalikan Midtrans payment token untuk proses pembayaran di frontend.' }),
    (0, swagger_1.ApiBody)({ type: CreateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order berhasil dibuat, payment token dari Midtrans dikembalikan.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(order_validation_1.createOrderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('preview'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(order_validation_1.createOrderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "previewOrder", null);
__decorate([
    (0, common_1.Post)(':id/bypass-pay'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "bypassPayment", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'Midtrans payment webhook', description: 'Endpoint untuk menerima notifikasi status pembayaran dari Midtrans secara otomatis. **Tidak memerlukan autentikasi.**' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook berhasil diproses.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Get)(':id/payment-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Cek & sinkronisasi status pembayaran order', description: 'Mensinkronkan status order dengan Midtrans dan mengembalikan status terbaru.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status pembayaran berhasil diambil.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getPaymentStatus", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map