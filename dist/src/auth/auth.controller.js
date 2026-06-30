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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const auth_validation_1 = require("./auth.validation");
const zod_1 = require("zod");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const jwt_refresh_guard_1 = require("../common/guards/jwt-refresh.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
// ─── DTO Classes (untuk Swagger body schema) ─────────────────────────────────
class LoginDto {
    email;
    password;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
    name;
    email;
    password;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Minimal 6 karakter' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
class GoogleMobileDto {
    idToken;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Google ID Token dari Flutter/React Native' }),
    __metadata("design:type", String)
], GoogleMobileDto.prototype, "idToken", void 0);
// ─────────────────────────────────────────────────────────────────────────────
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(body) {
        const result = await this.authService.login(body);
        return { data: result, message: 'Login successful' };
    }
    async register(body) {
        const result = await this.authService.register(body);
        return { data: result, message: 'Registration successful' };
    }
    async googleAuth() { }
    async googleAuthRedirect(req) {
        const result = await this.authService.googleLogin(req.user);
        return { data: result, message: 'Google login successful' };
    }
    async googleAuthMobile(body) {
        const result = await this.authService.googleLoginMobile(body.idToken);
        return { data: result, message: 'Google mobile login successful' };
    }
    async refresh(req) {
        const result = await this.authService.refreshTokens(req.token);
        return { data: result, message: 'Token refreshed successfully' };
    }
    async logout(user) {
        return await this.authService.logout(user.id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login dengan email & password' }),
    (0, swagger_1.ApiBody)({ type: LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login berhasil, mengembalikan accessToken & refreshToken.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Email atau password salah.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(auth_validation_1.loginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrasi akun baru' }),
    (0, swagger_1.ApiBody)({ type: RegisterDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Akun berhasil dibuat.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email sudah terdaftar.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(auth_validation_1.registerSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({ summary: 'Redirect ke Google OAuth (tidak bisa ditest di Swagger)' }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'Redirect ke Google consent screen.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({ summary: 'Google OAuth callback (dipanggil otomatis oleh Google)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login Google berhasil.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('google/mobile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login Google untuk aplikasi Mobile (Flutter/React Native)', description: 'Mengirim Google ID Token yang diperoleh dari SDK Google Sign-In di aplikasi mobile.' }),
    (0, swagger_1.ApiBody)({ type: GoogleMobileDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login berhasil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'ID Token tidak valid.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(auth_validation_1.googleMobileLoginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthMobile", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token', description: 'Kirim refresh token di header Authorization: Bearer <refreshToken>.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access token baru berhasil dibuat.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token tidak valid atau kedaluwarsa.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Logout pengguna', description: 'Menghapus refresh token dari database. Membutuhkan access token yang valid.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout berhasil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map