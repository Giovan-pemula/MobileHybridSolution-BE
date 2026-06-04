import { PrismaService } from '../common/prisma/prisma.service';
export declare class CategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            courses: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    })[]>;
    findById(id: number): Promise<({
        _count: {
            courses: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }) | null>;
    findBySlug(slug: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    } | null>;
    create(data: {
        name: string;
        slug: string;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    update(id: number, data: {
        name?: string;
        slug?: string;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
}
//# sourceMappingURL=category.repository.d.ts.map