import { UserRepository } from './user.repository';
import { R2Service } from '../common/storage/r2.service';
export declare class UserService {
    private readonly userRepository;
    private readonly r2Service;
    constructor(userRepository: UserRepository, r2Service: R2Service);
    getAllUsers(query: {
        page?: string;
        limit?: string;
    }): Promise<{
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
    }>;
    getUserById(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPublicProfile(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(id: number, data: {
        name?: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: number, data: {
        name?: string;
        email?: string;
        avatar?: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadAvatar(id: number, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map