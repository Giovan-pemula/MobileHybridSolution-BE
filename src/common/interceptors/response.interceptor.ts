import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

/**
 * Global response interceptor.
 * Wraps all successful controller return values into:
 * { success: true, message: string, data: T }
 *
 * Controllers can return:
 * - { data, message } → uses the provided message
 * - any other value  → wraps it with message: 'success'
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((value: any) => {
        if (
          value !== null &&
          typeof value === 'object' &&
          'data' in value &&
          'message' in value
        ) {
          return {
            success: true as const,
            message: value.message as string,
            data: value.data,
          };
        }

        return {
          success: true as const,
          message: 'success',
          data: value,
        };
      }),
    );
  }
}
