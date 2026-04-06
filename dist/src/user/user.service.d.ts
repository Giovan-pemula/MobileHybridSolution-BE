import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers(query: {
        page?: string;
        limit?: string;
    }): Promise<{
        data: {
            id: number;
            email: string;
            name: string;
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
        email: string;
        name: string;
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
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map