import { CategoryService } from './category.service';
import { createCategorySchema, updateCategorySchema } from '../validations/category.validation';
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
            id: number;
            name: string;
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
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    createCategory(body: z.infer<typeof createCategorySchema>): Promise<{
        data: {
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    updateCategory(id: number, body: z.infer<typeof updateCategorySchema>): Promise<{
        data: {
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
        };
        message: string;
    }>;
    deleteCategory(id: number): Promise<{
        data: null;
        message: string;
    }>;
}
//# sourceMappingURL=category.controller.d.ts.map