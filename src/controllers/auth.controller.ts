import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ok, badRequest, internalError, unauthorized } from '../utils/response';
import { loginSchema } from '../validations/auth.validation';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return badRequest(res, 'Invalid input', parsed.error.format());
    }

    const result = await authService.loginAdmin(parsed.data);

    return ok(res, result, 'Login successful');
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return unauthorized(res, 'wrong email or password');
    }
    console.error(error);
    return internalError(res, 'Login failed');
  }
};
