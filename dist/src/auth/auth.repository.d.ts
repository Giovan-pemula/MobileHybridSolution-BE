import { PrismaService } from '../common/prisma/prisma.service';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        refreshToken: string | null;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        refreshToken: string | null;
    } | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRefreshToken(id: number, refreshToken: string | null): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        refreshToken: string | null;
    }>;
}
//# sourceMappingURL=auth.repository.d.ts.map