import { UserService } from './user.service';
import { updateUserSchema } from '../validations/user.validation';
import { z } from 'zod';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(query: {
        page?: string;
        limit?: string;
    }): Promise<{
        data: {
            data: {
                id: number;
                name: string;
                email: string;
                role: import("../../generated/prisma/enums").UserRole;
                avatar: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getUser(id: number): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    updateUser(id: number, body: z.infer<typeof updateUserSchema>): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        data: null;
        message: string;
    }>;
}
//# sourceMappingURL=user.controller.d.ts.map