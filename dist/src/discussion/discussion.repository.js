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
exports.DiscussionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let DiscussionRepository = class DiscussionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByLessonId(lessonId) {
        return this.prisma.discussion.findMany({
            where: { lessonId },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                replies: {
                    include: { user: { select: { id: true, name: true, avatar: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.discussion.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                replies: { include: { user: { select: { id: true, name: true, avatar: true } } } },
            },
        });
    }
    async create(data) {
        return this.prisma.discussion.create({
            data,
            include: { user: { select: { id: true, name: true, avatar: true } } },
        });
    }
    async createReply(data) {
        return this.prisma.reply.create({
            data,
            include: { user: { select: { id: true, name: true, avatar: true } } },
        });
    }
};
exports.DiscussionRepository = DiscussionRepository;
exports.DiscussionRepository = DiscussionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscussionRepository);
//# sourceMappingURL=discussion.repository.js.map