import { CourseRepository } from './course.repository';
import { R2Service } from '../common/storage/r2.service';
import { PrismaService } from '../common/prisma/prisma.service';
export declare class CourseService {
    private readonly courseRepository;
    private readonly r2Service;
    private readonly prisma;
    constructor(courseRepository: CourseRepository, r2Service: R2Service, prisma: PrismaService);
    getAllCourses(query: Record<string, any>): Promise<{
        data: {
            averageRating: number;
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
            trainer: {
                name: string;
                id: number;
                email: string;
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
    }>;
    getAllCoursesForAdmin(query: Record<string, any>): Promise<{
        data: {
            averageRating: number;
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
            trainer: {
                name: string;
                id: number;
                email: string;
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
    }>;
    getCourseById(id: number): Promise<{
        averageRating: number;
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
        trainer: {
            name: string;
            id: number;
            email: string;
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
    }>;
    getCourseByIdForEnrolled(courseId: number, userId: number): Promise<{
        averageRating: number;
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
        trainer: {
            name: string;
            id: number;
            email: string;
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
    }>;
    createCourse(trainerId: number, data: any): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        trainer: {
            name: string;
            id: number;
            email: string;
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
    }>;
    updateCourse(id: number, userId: number, userRole: string, data: any): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        trainer: {
            name: string;
            id: number;
            email: string;
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
    }>;
    deleteCourse(id: number, userId: number, userRole: string): Promise<{
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
    }>;
    getCourseStudents(courseId: number, query: Record<string, any>, userId: number, userRole: string): Promise<{
        data: ({
            user: {
                name: string;
                id: number;
                email: string;
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
    }>;
    uploadThumbnail(courseId: number, userId: number, userRole: string, file: Express.Multer.File): Promise<{
        category: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        trainer: {
            name: string;
            id: number;
            email: string;
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
    }>;
}
//# sourceMappingURL=course.service.d.ts.map