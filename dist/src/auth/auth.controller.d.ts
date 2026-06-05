import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from './auth.validation';
import { z } from 'zod';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
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
    refresh(req: any): Promise<{
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
    logout(user: CurrentUserPayload): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map