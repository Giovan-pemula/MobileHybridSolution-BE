import { TrainerService } from './trainer.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    getTrainerDashboard(user: CurrentUserPayload): Promise<{
        data: {
            totalCourses: number;
            totalStudents: number;
            totalRevenue: number;
            latestCourses: ({
                category: {
                    name: string;
                    id: number;
                    createdAt: Date;
                    slug: string;
                };
                _count: {
                    enrollments: number;
                    ratings: number;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
                price: number;
                isFree: boolean;
                thumbnail: string | null;
                previewYoutubeUrl: string | null;
                status: import("../../generated/prisma/enums").CourseStatus;
                categoryId: number;
                trainerId: number;
            })[];
        };
        message: string;
    }>;
    getTrainerSales(user: CurrentUserPayload): Promise<{
        data: {
            totalCoursesSold: number;
            totalRevenue: number;
            totalStudents: number;
            courses: {
                courseId: number;
                title: string;
                totalStudents: number;
                totalRevenue: number;
            }[];
        };
        message: string;
    }>;
}
//# sourceMappingURL=trainer.controller.d.ts.map