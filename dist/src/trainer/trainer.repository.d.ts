import { PrismaService } from '../common/prisma/prisma.service';
export declare class TrainerRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(trainerId: number): Promise<{
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
            description: string | null;
            title: string;
            price: number;
            isFree: boolean;
            thumbnail: string | null;
            previewYoutubeUrl: string | null;
            status: import("../../generated/prisma/enums").CourseStatus;
            categoryId: number;
            trainerId: number;
        })[];
    }>;
    getSales(trainerId: number): Promise<{
        totalCoursesSold: number;
        totalRevenue: number;
        totalStudents: number;
        courses: {
            courseId: number;
            title: string;
            totalStudents: number;
            totalRevenue: number;
        }[];
    }>;
}
//# sourceMappingURL=trainer.repository.d.ts.map