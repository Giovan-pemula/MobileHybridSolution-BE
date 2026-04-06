import { CourseRepository } from './course.repository';
export declare class CourseService {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    getAllCourses(query: Record<string, any>): Promise<{
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
                name: string;
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
            name: string;
            email: string;
            avatar: string | null;
        };
        sections: ({
            lessons: {
                id: number;
                title: string;
                order: number;
                youtubeUrl: string | null;
                duration: number | null;
                isPreview: boolean;
                sectionId: number;
            }[];
        } & {
            id: number;
            title: string;
            courseId: number;
            order: number;
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
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
        };
        trainer: {
            id: number;
            name: string;
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
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
        };
        trainer: {
            id: number;
            name: string;
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
    deleteCourse(id: number, userId: number, userRole: string): Promise<void>;
    getCourseStudents(courseId: number, query: Record<string, any>, userId: number, userRole: string): Promise<{
        data: ({
            user: {
                id: number;
                name: string;
                email: string;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            courseId: number;
            userId: number;
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
}
//# sourceMappingURL=course.service.d.ts.map