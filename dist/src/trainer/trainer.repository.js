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
exports.TrainerRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let TrainerRepository = class TrainerRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(trainerId) {
        const [totalCourses, totalStudents, latestCourses] = await Promise.all([
            this.prisma.course.count({ where: { trainerId } }),
            this.prisma.enrollment.count({ where: { course: { trainerId } } }),
            this.prisma.course.findMany({
                where: { trainerId },
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: true,
                    _count: { select: { enrollments: true, ratings: true } },
                },
            }),
        ]);
        const revenue = await this.prisma.orderItemRevenue.aggregate({
            where: { orderItem: { course: { trainerId } } },
            _sum: { trainerShare: true },
        });
        return {
            totalCourses,
            totalStudents,
            totalRevenue: revenue._sum.trainerShare || 0,
            latestCourses,
        };
    }
    async getSales(trainerId) {
        const courses = await this.prisma.course.findMany({
            where: { trainerId },
            include: {
                _count: { select: { enrollments: true } },
                orderItems: {
                    select: {
                        revenue: { select: { trainerShare: true } },
                    },
                },
            },
        });
        const salesData = courses.map((course) => {
            const totalRevenue = course.orderItems.reduce((sum, item) => sum + (item.revenue?.trainerShare || 0), 0);
            return {
                courseId: course.id,
                title: course.title,
                totalStudents: course._count.enrollments,
                totalRevenue,
            };
        });
        return {
            totalCoursesSold: salesData.reduce((sum, s) => sum + s.totalStudents, 0),
            totalRevenue: salesData.reduce((sum, s) => sum + s.totalRevenue, 0),
            totalStudents: salesData.reduce((sum, s) => sum + s.totalStudents, 0),
            courses: salesData,
        };
    }
};
exports.TrainerRepository = TrainerRepository;
exports.TrainerRepository = TrainerRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainerRepository);
//# sourceMappingURL=trainer.repository.js.map