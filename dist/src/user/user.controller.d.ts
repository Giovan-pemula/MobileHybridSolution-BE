import { UserService } from './user.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { updateProfileSchema, updateUserSchema } from './user.validation';
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
    getProfile(currentUser: CurrentUserPayload): Promise<{
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
    updateProfile(body: z.infer<typeof updateProfileSchema>, currentUser: CurrentUserPayload): Promise<{
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
    uploadProfileAvatar(currentUser: CurrentUserPayload, file: Express.Multer.File): Promise<{
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
    getPublicProfile(id: number, currentUser: CurrentUserPayload): Promise<{
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
    uploadAvatar(id: number, file: Express.Multer.File): Promise<{
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
        data: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
        };
        message: string;
    }>;
}
//# sourceMappingURL=user.controller.d.ts.map