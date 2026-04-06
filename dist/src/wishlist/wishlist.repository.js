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
exports.WishlistRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let WishlistRepository = class WishlistRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUser(userId) {
        return this.prisma.wishlist.findMany({
            where: { userId },
            include: {
                course: {
                    include: {
                        category: true,
                        trainer: { select: { id: true, name: true, avatar: true } },
                        _count: { select: { enrollments: true } },
                    },
                },
            },
        });
    }
    async findByUserAndCourse(userId, courseId) {
        return this.prisma.wishlist.findUnique({ where: { userId_courseId: { userId, courseId } } });
    }
    async create(userId, courseId) {
        return this.prisma.wishlist.create({
            data: { userId, courseId },
            include: {
                course: {
                    include: {
                        category: true,
                        trainer: { select: { id: true, name: true, avatar: true } },
                    },
                },
            },
        });
    }
    async delete(userId, courseId) {
        return this.prisma.wishlist.delete({ where: { userId_courseId: { userId, courseId } } });
    }
};
exports.WishlistRepository = WishlistRepository;
exports.WishlistRepository = WishlistRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistRepository);
//# sourceMappingURL=wishlist.repository.js.map