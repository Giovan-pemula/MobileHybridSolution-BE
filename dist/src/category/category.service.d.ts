import { CategoryRepository } from './category.repository';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getAllCategories(): Promise<({
        _count: {
            courses: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    })[]>;
    getCategoryById(id: number): Promise<{
        _count: {
            courses: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    createCategory(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    updateCategory(id: number, data: {
        name?: string;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    deleteCategory(id: number): Promise<void>;
}
//# sourceMappingURL=category.service.d.ts.map