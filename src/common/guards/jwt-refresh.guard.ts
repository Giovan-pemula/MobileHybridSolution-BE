import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyRefreshToken } from '../../utils/jwt';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const token = authHeader.split(' ')[1];

    try {
      // payload will be { id: number }
      const payload = verifyRefreshToken<{ id: number }>(token!);
      (req as any).user = payload;
      (req as any).token = token;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
