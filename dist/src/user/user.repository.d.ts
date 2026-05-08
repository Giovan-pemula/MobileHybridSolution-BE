import { PrismaService } from '../common/prisma/prisma.service';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(skip: number, limit: number): Promise<{
        users: {
            name: string;
            id: number;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    findById(id: number): Promise<{
        name: string;
        id: number;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: number, data: {
        name?: string;
        email?: string;
        avatar?: string;
        role?: string;
    }): Promise<{
        name: string;
        id: number;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=user.repository.d.ts.map