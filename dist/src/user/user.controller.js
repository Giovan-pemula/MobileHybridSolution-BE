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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const user_validation_1 = require("./user.validation");
const multer_config_1 = require("../common/multer/multer.config");
const zod_1 = require("zod");
class UpdateProfileDto {
    name;
    phone;
    city;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08123456789', required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jakarta', required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "city", void 0);
class UpdateUserDto {
    role;
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TRAINER', enum: ['USER', 'TRAINER', 'ADMIN'], required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
class UploadAvatarDto {
    avatar;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'File gambar avatar' }),
    __metadata("design:type", Object)
], UploadAvatarDto.prototype, "avatar", void 0);
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(query) {
        const result = await this.userService.getAllUsers(query);
        return { data: result, message: 'Users fetched successfully' };
    }
    async getProfile(currentUser) {
        const user = await this.userService.getUserById(currentUser.id);
        return { data: user, message: 'Profile fetched successfully' };
    }
    async updateProfile(body, currentUser) {
        const user = await this.userService.updateProfile(currentUser.id, body);
        return { data: user, message: 'Profile updated successfully' };
    }
    async uploadProfileAvatar(currentUser, file) {
        const updated = await this.userService.uploadAvatar(currentUser.id, file);
        return { data: updated, message: 'Avatar uploaded successfully' };
    }
    async getPublicProfile(id, currentUser) {
        const user = await this.userService.getPublicProfile(id);
        return { data: user, message: 'User fetched successfully' };
    }
    async updateUser(id, body) {
        const user = await this.userService.updateUser(id, body);
        return { data: user, message: 'User updated successfully' };
    }
    async uploadAvatar(id, file) {
        const updated = await this.userService.uploadAvatar(id, file);
        return { data: updated, message: 'Avatar uploaded successfully' };
    }
    async deleteUser(id) {
        const deleted = await this.userService.deleteUser(id);
        return { data: deleted, message: `User "${deleted.name}" deleted successfully` };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Ambil semua pengguna' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: '10' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar pengguna berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak, bukan ADMIN.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil profil pengguna yang sedang login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update profil pengguna yang sedang login' }),
    (0, swagger_1.ApiBody)({ type: UpdateProfileDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil berhasil diperbarui.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(user_validation_1.updateProfileSchema))),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('profile/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', (0, multer_config_1.imageUploadOptions)())),
    (0, swagger_1.ApiOperation)({ summary: 'Upload avatar pengguna yang sedang login', description: 'Gunakan `multipart/form-data` dengan field bernama `avatar`.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: UploadAvatarDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Avatar berhasil diupload.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfileAvatar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil profil publik pengguna berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID pengguna' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data pengguna berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pengguna tidak ditemukan.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPublicProfile", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Update data pengguna berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID pengguna' }),
    (0, swagger_1.ApiBody)({ type: UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data pengguna berhasil diperbarui.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(user_validation_1.updateUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(':id/avatar'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', (0, multer_config_1.imageUploadOptions)())),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Upload avatar pengguna tertentu' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID pengguna' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: UploadAvatarDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Avatar berhasil diupload.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Hapus akun pengguna berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID pengguna' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pengguna berhasil dihapus.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pengguna tidak ditemukan.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map