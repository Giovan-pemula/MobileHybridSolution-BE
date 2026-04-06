import { TrainerRequestRepository } from './trainer-request.repository';
import { UserRepository } from '../user/user.repository';
export declare class TrainerRequestService {
    private readonly trainerRequestRepository;
    private readonly userRepository;
    constructor(trainerRequestRepository: TrainerRequestRepository, userRepository: UserRepository);
    submitRequest(userId: number, data: {
        cvUrl: string;
        bio: string;
        experience: string;
    }): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
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
    getAllRequests(status?: string): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
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
    verifyTrainer(requestId: number, status: string): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
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
//# sourceMappingURL=trainer-request.service.d.ts.map