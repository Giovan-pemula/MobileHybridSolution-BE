import { Request, Response, NextFunction } from 'express';
import { forbidden } from '../utils/response';

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return forbidden(res, 'Access denied');
    }

    if (!roles.includes(req.user.role)) {
      return forbidden(res, 'You do not have permission to perform this action');
    }

    next();
  };
}
