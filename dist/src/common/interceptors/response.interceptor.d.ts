import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
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
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>>;
}
//# sourceMappingURL=response.interceptor.d.ts.map