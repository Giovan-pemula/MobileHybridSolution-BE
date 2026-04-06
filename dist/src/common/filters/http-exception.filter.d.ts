import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
/**
 * Global exception filter.
 * Catches ALL exceptions and returns a consistent error envelope:
 * { success: false, message: string, errors?: unknown }
 *
 * This preserves the response format from the original Express implementation.
 */
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
//# sourceMappingURL=http-exception.filter.d.ts.map