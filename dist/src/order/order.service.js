"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("./order.repository");
const enrollment_repository_1 = require("../enrollment/enrollment.repository");
const prisma_service_1 = require("../common/prisma/prisma.service");
const env_1 = require("../config/env");
const crypto = __importStar(require("crypto"));
const midtrans_1 = require("../config/midtrans");
const enums_1 = require("../../generated/prisma/enums");
let OrderService = class OrderService {
    orderRepository;
    enrollmentRepository;
    prisma;
    constructor(orderRepository, enrollmentRepository, prisma) {
        this.orderRepository = orderRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.prisma = prisma;
    }
    async getOrders(userId) {
        return this.orderRepository.findByUser(userId);
    }
    async createOrder(userId, courseIds) {
        const courses = await this.prisma.course.findMany({
            where: { id: { in: courseIds }, status: 'PUBLISHED' },
        });
        if (courses.length !== courseIds.length)
            throw new common_1.NotFoundException('One or more courses not found');
        for (const course of courses) {
            const existing = await this.enrollmentRepository.findByUserAndCourse(userId, course.id);
            if (existing)
                throw new common_1.ConflictException('Already enrolled in one of the courses');
        }
        const items = courses.map((course) => ({
            courseId: course.id,
            price: course.isFree ? 0 : course.price,
        }));
        const order = await this.orderRepository.create(userId, items);
        if (order.total === 0) {
            for (const course of courses) {
                await this.enrollmentRepository.create(userId, course.id);
            }
            return { ...order, snapToken: null, snapRedirectUrl: null };
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const midtransOrderId = `ORDER-${order.id}-${Date.now()}`;
        const payload = {
            transaction_details: {
                order_id: midtransOrderId,
                gross_amount: order.total,
            },
            credit_card: { secure: true },
            item_details: courses.map((course) => ({
                id: course.id.toString(),
                price: course.price,
                quantity: 1,
                name: course.title.substring(0, 50),
            })),
            customer_details: {
                first_name: user.name,
                email: user.email,
            },
        };
        try {
            const transaction = await midtrans_1.snap.createTransaction(payload);
            return {
                ...order,
                snapToken: transaction.token,
                snapRedirectUrl: transaction.redirect_url,
            };
        }
        catch (error) {
            await this.prisma.order.delete({ where: { id: order.id } });
            throw new common_1.BadRequestException(`Payment gateway error: ${error.message}`);
        }
    }
    async handleWebhook(payload) {
        const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = payload;
        const hash = crypto.createHash('sha512');
        hash.update(`${order_id}${status_code}${gross_amount}${env_1.env.MIDTRANS_SERVER_KEY}`);
        const calculatedSignature = hash.digest('hex');
        if (calculatedSignature !== signature_key) {
            throw new common_1.ForbiddenException('Invalid signature');
        }
        const orderIdStr = order_id.split('-')[1];
        const orderId = parseInt(orderIdStr, 10);
        if (isNaN(orderId))
            throw new common_1.BadRequestException('Invalid order id format');
        const order = await this.orderRepository.findById(orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status === enums_1.OrderStatus.COMPLETED) {
            return { message: 'Order already completed' };
        }
        let newStatus = order.status;
        if (transaction_status === 'capture' || transaction_status === 'settlement') {
            if (fraud_status === 'challenge') {
                newStatus = enums_1.OrderStatus.PENDING;
            }
            else {
                newStatus = enums_1.OrderStatus.COMPLETED;
            }
        }
        else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
            newStatus = enums_1.OrderStatus.CANCELLED;
        }
        else if (transaction_status === 'pending') {
            newStatus = enums_1.OrderStatus.PENDING;
        }
        if (newStatus !== order.status) {
            await this.orderRepository.updateStatus(orderId, newStatus);
            if (newStatus === enums_1.OrderStatus.COMPLETED) {
                for (const item of order.items) {
                    const existing = await this.enrollmentRepository.findByUserAndCourse(order.userId, item.courseId);
                    if (!existing) {
                        await this.enrollmentRepository.create(order.userId, item.courseId);
                    }
                }
            }
        }
        return { message: 'Webhook processed' };
    }
    async syncPaymentStatus(userId, orderId) {
        const order = await this.orderRepository.findById(orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Not your order');
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        enrollment_repository_1.EnrollmentRepository,
        prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map