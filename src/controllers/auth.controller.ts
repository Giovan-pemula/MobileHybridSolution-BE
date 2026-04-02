import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ok, badRequest, internalError, unauthorized, conflict } from '../utils/response';
import { loginSchema, registerSchema } from '../validations/auth.validation';

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return badRequest(res, 'Invalid input', parsed.error.format());
    }

    const result = await authService.login(parsed.data);

    return ok(res, result, 'Login successful');
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return unauthorized(res, 'Wrong email or password');
    }
    console.error(error);
    return internalError(res, 'Login failed');
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return badRequest(res, 'Invalid input', parsed.error.format());
    }

    const result = await authService.register(parsed.data);

    return ok(res, result, 'Registration successful', 201);
  } catch (error: any) {
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      return conflict(res, 'Email already registered');
    }
    console.error(error);
    return internalError(res, 'Registration failed');
  }
};
