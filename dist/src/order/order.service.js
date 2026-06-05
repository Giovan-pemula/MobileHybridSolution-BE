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
const gamification_service_1 = require("../gamification/gamification.service");
let OrderService = class OrderService {
    orderRepository;
    enrollmentRepository;
    prisma;
    gamificationService;
    constructor(orderRepository, enrollmentRepository, prisma, gamificationService) {
        this.orderRepository = orderRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.prisma = prisma;
        this.gamificationService = gamificationService;
    }
    async getOrders(userId) {
        return this.orderRepository.findByUser(userId);
    }
    async getAllOrdersForAdmin() {
        return this.orderRepository.findAllWithRevenue();
    }
    async createOrder(userId, courseIds, couponId) {
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
        let couponDiscountPct = 0;
        if (couponId) {
            const coupon = await this.prisma.coupon.findFirst({
                where: { id: couponId, userId, isUsed: false },
            });
            if (!coupon)
                throw new common_1.NotFoundException('Coupon not found or already used');
            couponDiscountPct = coupon.discountPct;
            // Mark coupon as used immediately
            await this.prisma.coupon.update({
                where: { id: couponId },
                data: { isUsed: true, usedAt: new Date() },
            });
        }
        const cartTotal = courses.reduce((sum, course) => sum + (course.isFree ? 0 : course.price), 0);
        const totalCouponDiscount = cartTotal * (couponDiscountPct / 100);
        const serviceFee = 10000;
        // Total price to pay = cartTotal - discount + serviceFee
        const finalTotal = Math.max(0, cartTotal - totalCouponDiscount) + serviceFee;
        const items = courses.map((course) => {
            const basePrice = course.isFree ? 0 : course.price;
            // Proportional discount allocation
            let allocatedDiscount = 0;
            if (cartTotal > 0) {
                allocatedDiscount = (basePrice / cartTotal) * totalCouponDiscount;
            }
            const netRevenue = basePrice - allocatedDiscount;
            const trainerShare = netRevenue * 0.8;
            const platformShare = netRevenue * 0.2;
            return {
                courseId: course.id,
                price: basePrice,
                revenue: {
                    basePrice,
                    discountAmt: allocatedDiscount,
                    netRevenue,
                    trainerShare,
                    platformShare,
                },
            };
        });
        const order = await this.orderRepository.create(userId, finalTotal, couponId || null, totalCouponDiscount, serviceFee, items);
        const summary = {
            subtotal: cartTotal,
            discountAmt: totalCouponDiscount,
            serviceFee,
            total: finalTotal,
        };
        if (order.total === 0 || cartTotal === 0) {
            for (const course of courses) {
                await this.enrollmentRepository.create(userId, course.id);
            }
            return { ...order, summary, snapToken: null, snapRedirectUrl: null };
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const midtransOrderId = `ORDER-${order.id}-${Date.now()}`;
        // Setup midtrans item details
        const itemDetails = courses.map((course) => ({
            id: `COURSE-${course.id}`,
            price: course.price,
            quantity: 1,
            name: course.title.substring(0, 50),
        }));
        if (totalCouponDiscount > 0) {
            itemDetails.push({
                id: `COUPON-${couponId}`,
                price: -Math.round(totalCouponDiscount),
                quantity: 1,
                name: `Coupon Discount ${couponDiscountPct}%`,
            });
        }
        itemDetails.push({
            id: `FEE-SERVICE`,
            price: serviceFee,
            quantity: 1,
            name: 'Platform Service Fee',
        });
        const payload = {
            transaction_details: {
                order_id: midtransOrderId,
                gross_amount: Math.round(finalTotal),
            },
            credit_card: { secure: true },
            item_details: itemDetails,
            customer_details: {
                first_name: user.name,
                email: user.email,
            },
        };
        try {
            const transaction = await midtrans_1.snap.createTransaction(payload);
            return {
                ...order,
                summary,
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
                await this.gamificationService.addXp(order.userId, 50 * order.items.length, 'COURSE_CHECKOUT');
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
        prisma_service_1.PrismaService,
        gamification_service_1.GamificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map