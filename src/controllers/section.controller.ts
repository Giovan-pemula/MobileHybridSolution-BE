import { Request, Response } from 'express';
import { sectionService } from '../services/section.service';
import { ok, badRequest, notFound, forbidden, internalError } from '../utils/response';
import { createSectionSchema, updateSectionSchema } from '../validations/section.validation';
import { getParamInt } from '../utils/params';

export const getSections = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const sections = await sectionService.getSectionsByCourse(courseId);
    return ok(res, sections, 'Sections fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch sections');
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const parsed = createSectionSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const section = await sectionService.createSection(courseId, req.user!.id, req.user!.role, parsed.data);
    return ok(res, section, 'Section created successfully', 201);
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to create section');
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateSectionSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const section = await sectionService.updateSection(id, req.user!.id, req.user!.role, parsed.data);
    return ok(res, section, 'Section updated successfully');
  } catch (error: any) {
    if (error.message === 'SECTION_NOT_FOUND') return notFound(res, 'Section not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to update section');
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await sectionService.deleteSection(id, req.user!.id, req.user!.role);
    return ok(res, null, 'Section deleted successfully');
  } catch (error: any) {
    if (error.message === 'SECTION_NOT_FOUND') return notFound(res, 'Section not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to delete section');
  }
};
