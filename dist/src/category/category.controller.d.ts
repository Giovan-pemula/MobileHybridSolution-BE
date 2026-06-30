import { CategoryService } from './category.service';
import { createCategorySchema, updateCategorySchema } from './category.validation';
import { z } from 'zod';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        data: ({
            _count: {
                courses: number;
            };
        } & {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        })[];
        message: string;
    }>;
    getCategory(id: number): Promise<{
        data: {
            _count: {
                courses: number;
            };
        } & {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    createCategory(body: z.infer<typeof createCategorySchema>): Promise<{
        data: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    updateCategory(id: number, body: z.infer<typeof updateCategorySchema>): Promise<{
        data: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    deleteCategory(id: number): Promise<{
        data: {
            name: string;
            id: number;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
}
//# sourceMappingURL=category.controller.d.ts.map