import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

/**
 * A generic NestJS pipe that validates the incoming value against a Zod schema.
 * Use it with @Body(), @Query(), or @Param() decorators.
 *
 * @example
 * @Post('login')
 * async login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) { ... }
 */
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Invalid input',
        errors: result.error.format(),
      });
    }

    return result.data;
  }
}
