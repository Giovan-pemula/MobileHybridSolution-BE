import { PrismaService } from '../common/prisma/prisma.service';
export interface CourseFilters {
    categoryId?: number;
    search?: string;
    isFree?: boolean;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
    trainerId?: number;
}
export declare class CourseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(skip: number, limit: number, filters: CourseFilters): Promise<{
        courses: {
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
            description: string | null;
            title: string;
            price: number;
            isFree: boolean;
            thumbnail: string | null;
            previewYoutubeUrl: string | null;
            status: import("../../generated/prisma/enums").CourseStatus;
            categoryId: number;
            trainerId: number;
        }[];
        total: number;
    }>;
    findById(id: number): Promise<({
        category: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        ratings: {
            rating: number;
        }[];
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
                duration: number | null;
                youtubeUrl: string | null;
                isPreview: boolean;
                sectionId: number;
            }[];
        } & {
            order: number;
            id: number;
            title: string;
            courseId: number;
        })[];
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
    }) | null>;
    create(data: {
        title: string;
        description?: string;
        price?: number;
        isFree?: boolean;
        thumbnail?: string;
        previewYoutubeUrl?: string;
        categoryId: number;
        trainerId: number;
        status?: string;
    }): Promise<{
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
        description: string | null;
        title: string;
        price: number;
        isFree: boolean;
        thumbnail: string | null;
        previewYoutubeUrl: string | null;
        status: import("../../generated/prisma/enums").CourseStatus;
        categoryId: number;
        trainerId: number;
    }>;
    update(id: number, data: any): Promise<{
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
        description: string | null;
        title: string;
        price: number;
        isFree: boolean;
        thumbnail: string | null;
        previewYoutubeUrl: string | null;
        status: import("../../generated/prisma/enums").CourseStatus;
        categoryId: number;
        trainerId: number;
    }>;
    delete(id: number): Promise<{
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
    }>;
    getStudents(courseId: number, skip: number, limit: number): Promise<{
        enrollments: ({
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
        total: number;
    }>;
}
//# sourceMappingURL=course.repository.d.ts.map