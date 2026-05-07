import { EnrollmentService } from './enrollment.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    getMyCourses(user: CurrentUserPayload): Promise<{
        data: {
            progress: number;
            completed: boolean;
            totalLessons: number;
            completedLessons: number;
            course: {
                category: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    slug: string;
                };
                _count: {
                    sections: number;
                };
                trainer: {
                    id: number;
                    name: string;
                    avatar: string | null;
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
            };
            id: number;
            createdAt: Date;
            userId: number;
            courseId: number;
        }[];
        message: string;
    }>;
    enrollInCourse(courseId: number, user: CurrentUserPayload): Promise<{
        data: {
            course: {
                category: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    slug: string;
                };
                trainer: {
                    id: number;
                    name: string;
                    avatar: string | null;
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
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            courseId: number;
            progress: number;
            completed: boolean;
        };
        message: string;
    }>;
}
//# sourceMappingURL=enrollment.controller.d.ts.map