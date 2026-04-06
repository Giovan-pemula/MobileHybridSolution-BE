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
exports.SectionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let SectionRepository = class SectionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByCourseId(courseId) {
        return this.prisma.section.findMany({
            where: { courseId },
            orderBy: { order: 'asc' },
            include: { lessons: { orderBy: { order: 'asc' } } },
        });
    }
    async findById(id) {
        return this.prisma.section.findUnique({
            where: { id },
            include: { course: true, lessons: { orderBy: { order: 'asc' } } },
        });
    }
    async create(data) {
        if (!data.order) {
            const lastSection = await this.prisma.section.findFirst({
                where: { courseId: data.courseId },
                orderBy: { order: 'desc' },
            });
            data.order = (lastSection?.order ?? 0) + 1;
        }
        return this.prisma.section.create({ data });
    }
    async update(id, data) {
        return this.prisma.section.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.section.delete({ where: { id } });
    }
};
exports.SectionRepository = SectionRepository;
exports.SectionRepository = SectionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SectionRepository);
//# sourceMappingURL=section.repository.js.map