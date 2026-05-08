import { AuthRepository } from './auth.repository';
import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.validation';
type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    login(payload: LoginPayload): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
    }>;
    register(payload: RegisterPayload): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map