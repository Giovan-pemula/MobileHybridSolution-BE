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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const enums_1 = require("../../generated/prisma/enums");
let OrderRepository = class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                thumbnail: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        course: {
                            include: {
                                category: true,
                                trainer: { select: { id: true, name: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllWithRevenue() {
        return this.prisma.order.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: {
                    include: {
                        course: { select: { id: true, title: true, trainer: { select: { name: true } } } },
                        revenue: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(userId, total, couponId, discountAmt, serviceFee, items) {
        return this.prisma.order.create({
            data: {
                userId,
                total,
                couponId,
                discountAmt,
                serviceFee,
                status: total === 0 ? enums_1.OrderStatus.COMPLETED : enums_1.OrderStatus.PENDING,
                items: {
                    create: items.map(item => ({
                        courseId: item.courseId,
                        price: item.price,
                        revenue: { create: item.revenue },
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                thumbnail: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: { course: true },
                },
            },
        });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map