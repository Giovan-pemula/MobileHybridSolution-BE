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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("./order.repository");
const enrollment_repository_1 = require("../enrollment/enrollment.repository");
const prisma_service_1 = require("../common/prisma/prisma.service");
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
        for (const course of courses) {
            await this.enrollmentRepository.create(userId, course.id);
        }
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