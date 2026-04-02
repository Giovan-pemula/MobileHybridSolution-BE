import { Request, Response } from 'express';
import { categoryService } from '../services/category.service';
import { ok, badRequest, notFound, conflict, internalError } from '../utils/response';
import { createCategorySchema, updateCategorySchema } from '../validations/category.validation';
import { getParamInt } from '../utils/params';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return ok(res, categories, 'Categories fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch categories');
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const category = await categoryService.getCategoryById(id);
    return ok(res, category, 'Category fetched successfully');
  } catch (error: any) {
    if (error.message === 'CATEGORY_NOT_FOUND') return notFound(res, 'Category not found');
    console.error(error);
    return internalError(res, 'Failed to fetch category');
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const category = await categoryService.createCategory(parsed.data);
    return ok(res, category, 'Category created successfully', 201);
  } catch (error: any) {
    if (error.message === 'CATEGORY_ALREADY_EXISTS') return conflict(res, 'Category already exists');
    console.error(error);
    return internalError(res, 'Failed to create category');
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateCategorySchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const category = await categoryService.updateCategory(id, parsed.data);
    return ok(res, category, 'Category updated successfully');
  } catch (error: any) {
    if (error.message === 'CATEGORY_NOT_FOUND') return notFound(res, 'Category not found');
    console.error(error);
    return internalError(res, 'Failed to update category');
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await categoryService.deleteCategory(id);
    return ok(res, null, 'Category deleted successfully');
  } catch (error: any) {
    if (error.message === 'CATEGORY_NOT_FOUND') return notFound(res, 'Category not found');
    console.error(error);
    return internalError(res, 'Failed to delete category');
  }
};
