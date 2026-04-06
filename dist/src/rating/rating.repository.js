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
exports.RatingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let RatingRepository = class RatingRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserAndCourse(userId, courseId) {
        return this.prisma.rating.findUnique({ where: { userId_courseId: { userId, courseId } } });
    }
    async findById(id) {
        return this.prisma.rating.findUnique({ where: { id } });
    }
    async findByCourse(courseId) {
        return this.prisma.rating.findMany({
            where: { courseId },
            include: { user: { select: { id: true, name: true, avatar: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        return this.prisma.rating.create({
            data,
            include: { user: { select: { id: true, name: true, avatar: true } } },
        });
    }
    async update(id, data) {
        return this.prisma.rating.update({
            where: { id }, data,
            include: { user: { select: { id: true, name: true, avatar: true } } },
        });
    }
    async delete(id) {
        return this.prisma.rating.delete({ where: { id } });
    }
};
exports.RatingRepository = RatingRepository;
exports.RatingRepository = RatingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingRepository);
//# sourceMappingURL=rating.repository.js.map