import { CourseService } from './course.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createCourseSchema, updateCourseSchema } from '../validations/course.validation';
import { z } from 'zod';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getCourses(query: Record<string, any>): Promise<{
        data: {
            data: {
                averageRating: number;
                category: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    slug: string;
                };
                _count: {
                    enrollments: number;
                    ratings: number;
                };
                trainer: {
                    id: number;
                    email: string;
                    name: string;
                    avatar: string | null;
                };
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
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getCourse(id: number): Promise<{
        data: {
            averageRating: number;
            category: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            };
            _count: {
                enrollments: number;
                ratings: number;
            };
            trainer: {
                id: number;
                email: string;
                name: string;
                avatar: string | null;
            };
            sections: ({
                lessons: {
                    order: number;
                    id: number;
                    title: string;
                    youtubeUrl: string | null;
                    duration: number | null;
                    isPreview: boolean;
                    sectionId: number;
                }[];
            } & {
                order: number;
                id: number;
                title: string;
                courseId: number;
            })[];
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
        message: string;
    }>;
    createCourse(user: CurrentUserPayload, body: z.infer<typeof createCourseSchema>): Promise<{
        data: {
            category: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            };
            trainer: {
                id: number;
                email: string;
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
        message: string;
    }>;
    updateCourse(id: number, user: CurrentUserPayload, body: z.infer<typeof updateCourseSchema>): Promise<{
        data: {
            category: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            };
            trainer: {
                id: number;
                email: string;
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
        message: string;
    }>;
    deleteCourse(id: number, user: CurrentUserPayload): Promise<{
        data: null;
        message: string;
    }>;
    getCourseStudents(courseId: number, query: Record<string, any>, user: CurrentUserPayload): Promise<{
        data: {
            data: ({
                user: {
                    id: number;
                    email: string;
                    name: string;
                    avatar: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                userId: number;
                courseId: number;
                progress: number;
                completed: boolean;
            })[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
}
//# sourceMappingURL=course.controller.d.ts.map