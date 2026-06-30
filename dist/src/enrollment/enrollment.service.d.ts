import { EnrollmentRepository } from './enrollment.repository';
import { CourseRepository } from '../course/course.repository';
import { PrismaService } from '../common/prisma/prisma.service';
export declare class EnrollmentService {
    private readonly enrollmentRepository;
    private readonly courseRepository;
    private readonly prisma;
    constructor(enrollmentRepository: EnrollmentRepository, courseRepository: CourseRepository, prisma: PrismaService);
    getMyCourses(userId: number): Promise<{
        progress: number;
        completed: boolean;
        totalLessons: number;
        completedLessons: number;
        course: {
            category: {
                name: string;
                id: number;
                createdAt: Date;
                slug: string;
            };
            _count: {
                sections: number;
            };
            trainer: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
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
    }[]>;
    enrollInCourse(userId: number, courseId: number): Promise<{
        course: {
            category: {
                name: string;
                id: number;
                createdAt: Date;
                slug: string;
            };
            trainer: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
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
    }>;
}
//# sourceMappingURL=enrollment.service.d.ts.map