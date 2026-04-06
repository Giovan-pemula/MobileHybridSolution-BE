import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import { z } from 'zod';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: z.infer<typeof loginSchema>): Promise<{
        data: {
            token: string;
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
        };
        message: string;
    }>;
    register(body: z.infer<typeof registerSchema>): Promise<{
        data: {
            token: string;
            user: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
            };
        };
        message: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map