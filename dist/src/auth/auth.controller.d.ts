import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from './auth.validation';
import { z } from 'zod';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: z.infer<typeof loginSchema>): Promise<{
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    register(body: z.infer<typeof registerSchema>): Promise<{
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        message: string;
        statusCode: number;
        data?: undefined;
    } | {
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
        message: string;
        statusCode?: undefined;
    }>;
    logout(userId: number): Promise<{
        message: string;
    } | {
        message: string;
        statusCode: number;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map