import { TrainerRequestService } from './trainer-request.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { trainerRequestSchema, verifyTrainerSchema } from './trainerRequest.validation';
import { z } from 'zod';
export declare class TrainerRequestController {
    private readonly trainerRequestService;
    constructor(trainerRequestService: TrainerRequestService);
    submitTrainerRequest(user: CurrentUserPayload, body: z.infer<typeof trainerRequestSchema>, cvFile: Express.Multer.File): Promise<{
        data: {
            user: {
                id: number;
                name: string;
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
        };
        message: string;
    }>;
    getTrainerRequests(status?: string): Promise<{
        data: ({
            user: {
                id: number;
                name: string;
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
        })[];
        message: string;
    }>;
    verifyTrainer(id: number, body: z.infer<typeof verifyTrainerSchema>): Promise<{
        data: {
            user: {
                id: number;
                name: string;
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
        };
        message: string;
    }>;
}
//# sourceMappingURL=trainer-request.controller.d.ts.map