"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("../utils/jwt");
let AuthService = class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async generateTokens(user) {
        const accessToken = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role });
        const refreshToken = (0, jwt_1.signRefreshToken)({ id: user.id });
        // Hash refresh token before saving to db
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);
        return { accessToken, refreshToken };
    }
    async login(payload) {
        const user = await this.authRepository.findByEmail(payload.email);
        if (!user)
            throw new common_1.UnauthorizedException('Wrong email or password');
        const isValidPassword = await bcrypt.compare(payload.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('Wrong email or password');
        const tokens = await this.generateTokens(user);
        return {
            ...tokens,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
    async register(payload) {
        const existing = await this.authRepository.findByEmail(payload.email);
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user = await this.authRepository.create({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
        });
        const tokens = await this.generateTokens(user);
        return {
            ...tokens,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
    async googleLogin(reqUser) {
        if (!reqUser) {
            throw new common_1.UnauthorizedException('No user from google');
        }
        let user = await this.authRepository.findByEmail(reqUser.email);
        if (!user) {
            // Create new user if not exists
            const randomPassword = (0, crypto_1.randomUUID)();
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            user = (await this.authRepository.create({
                name: `${reqUser.firstName} ${reqUser.lastName}`.trim() || 'Google User',
                email: reqUser.email,
                password: hashedPassword,
            })); // Cast because create returns specific fields but it's enough for generateTokens
        }
        const tokens = await this.generateTokens(user);
        return {
            ...tokens,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const user = await this.authRepository.findById(payload.id);
            if (!user || !user.refreshToken) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
            if (!isRefreshTokenValid) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const tokens = await this.generateTokens(user);
            return {
                ...tokens,
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
            };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(userId) {
        await this.authRepository.updateRefreshToken(userId, null);
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map