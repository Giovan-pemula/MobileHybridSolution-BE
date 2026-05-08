import { PrismaService } from '../common/prisma/prisma.service';
export declare class TrainerRequestRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<{
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").TrainerRequestStatus;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    } | null>;
    findById(id: number): Promise<({
        user: {
            name: string;
            id: number;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").TrainerRequestStatus;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    }) | null>;
    findAll(status?: string): Promise<({
        user: {
            name: string;
            id: number;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").TrainerRequestStatus;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    })[]>;
    create(data: {
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    }): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").TrainerRequestStatus;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    }>;
    updateStatus(id: number, status: string): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").TrainerRequestStatus;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
    }>;
}
//# sourceMappingURL=trainer-request.repository.d.ts.map