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
        total: number;
    }>;
    findById(id: number): Promise<({
        category: {
            id: number;
            name: string;
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
    update(id: number, data: any): Promise<{
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
    delete(id: number): Promise<{
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
    getStudents(courseId: number, skip: number, limit: number): Promise<{
        enrollments: ({
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
        total: number;
    }>;
}
//# sourceMappingURL=course.repository.d.ts.map