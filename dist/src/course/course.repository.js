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
exports.CourseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let CourseRepository = class CourseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(skip, limit, filters) {
        const where = {};
        if (filters.categoryId)
            where.categoryId = filters.categoryId;
        if (filters.trainerId)
            where.trainerId = filters.trainerId;
        if (filters.status)
            where.status = filters.status;
        if (filters.isFree !== undefined)
            where.isFree = filters.isFree;
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.price = {};
            if (filters.minPrice !== undefined)
                where.price.gte = filters.minPrice;
            if (filters.maxPrice !== undefined)
                where.price.lte = filters.maxPrice;
        }
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where, skip, take: limit,
                include: {
                    category: true,
                    trainer: { select: { id: true, name: true, email: true, avatar: true } },
                    _count: { select: { enrollments: true, ratings: true } },
                    ratings: { select: { rating: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.course.count({ where }),
        ]);
        const coursesWithRating = courses.map((course) => {
            const avgRating = course.ratings.length > 0
                ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length : 0;
            const { ratings, ...rest } = course;
            return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
        });
        return { courses: coursesWithRating, total };
    }
    async findById(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                category: true,
                trainer: { select: { id: true, name: true, email: true, avatar: true } },
                sections: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } },
                _count: { select: { enrollments: true, ratings: true } },
                ratings: { select: { rating: true } },
            },
        });
    }
    async create(data) {
        return this.prisma.course.create({
            data: data,
            include: {
                category: true,
                trainer: { select: { id: true, name: true, email: true, avatar: true } },
            },
        });
    }
    async update(id, data) {
        return this.prisma.course.update({
            where: { id }, data,
            include: {
                category: true,
                trainer: { select: { id: true, name: true, email: true, avatar: true } },
            },
        });
    }
    async delete(id) {
        return this.prisma.course.delete({ where: { id } });
    }
    async getStudents(courseId, skip, limit) {
        const [enrollments, total] = await Promise.all([
            this.prisma.enrollment.findMany({
                where: { courseId }, skip, take: limit,
                include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.enrollment.count({ where: { courseId } }),
        ]);
        return { enrollments, total };
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseRepository);
//# sourceMappingURL=course.repository.js.map