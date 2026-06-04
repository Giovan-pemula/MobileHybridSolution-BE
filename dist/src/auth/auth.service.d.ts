import { AuthRepository } from './auth.repository';
import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.validation';
type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    private generateTokens;
    login(payload: LoginPayload): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    register(payload: RegisterPayload): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    googleLogin(reqUser: any): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map