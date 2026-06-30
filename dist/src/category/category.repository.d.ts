import { PrismaService } from '../common/prisma/prisma.service';
export declare class CategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            courses: number;
        };
    } & {
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    })[]>;
    findById(id: number): Promise<({
        _count: {
            courses: number;
        };
    } & {
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    }) | null>;
    findBySlug(slug: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    } | null>;
    create(data: {
        name: string;
        slug: string;
    }): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    }>;
    update(id: number, data: {
        name?: string;
        slug?: string;
    }): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    }>;
    delete(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        slug: string;
    }>;
}
//# sourceMappingURL=category.repository.d.ts.map