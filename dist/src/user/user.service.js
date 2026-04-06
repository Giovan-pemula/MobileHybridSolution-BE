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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const pagination_1 = require("../utils/pagination");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(query) {
        const pagination = (0, pagination_1.parsePagination)(query);
        const { users, total } = await this.userRepository.findAll(pagination.skip, pagination.limit);
        return (0, pagination_1.paginatedResponse)(users, total, pagination.page, pagination.limit);
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (data.email && data.email !== user.email) {
            const existing = await this.userRepository.findByEmail(data.email);
            if (existing)
                throw new common_1.ConflictException('Email already in use');
        }
        return this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map