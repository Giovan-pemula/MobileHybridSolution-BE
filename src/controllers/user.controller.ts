import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ok, badRequest, notFound, conflict, internalError } from '../utils/response';
import { updateUserSchema } from '../validations/user.validation';
import { parsePagination } from '../utils/pagination';
import { getParamInt } from '../utils/params';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const pagination = parsePagination(req.query as any);
    const result = await userService.getAllUsers(pagination);
    return ok(res, result, 'Users fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch users');
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const user = await userService.getUserById(id);
    return ok(res, user, 'User fetched successfully');
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') return notFound(res, 'User not found');
    console.error(error);
    return internalError(res, 'Failed to fetch user');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const user = await userService.updateUser(id, parsed.data);
    return ok(res, user, 'User updated successfully');
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') return notFound(res, 'User not found');
    if (error.message === 'EMAIL_ALREADY_EXISTS') return conflict(res, 'Email already in use');
    console.error(error);
    return internalError(res, 'Failed to update user');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await userService.deleteUser(id);
    return ok(res, null, 'User deleted successfully');
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') return notFound(res, 'User not found');
    console.error(error);
    return internalError(res, 'Failed to delete user');
  }
};
