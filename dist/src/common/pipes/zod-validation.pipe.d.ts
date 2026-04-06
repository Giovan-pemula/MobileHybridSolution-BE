import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
/**
 * A generic NestJS pipe that validates the incoming value against a Zod schema.
 * Use it with @Body(), @Query(), or @Param() decorators.
 *
 * @example
 * @Post('login')
 * async login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) { ... }
 */
export declare class ZodValidationPipe<T> implements PipeTransform {
    private readonly schema;
    constructor(schema: ZodSchema<T>);
    transform(value: unknown): T;
}
//# sourceMappingURL=zod-validation.pipe.d.ts.map