import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
export declare class ZodValidationPipe<T> implements PipeTransform {
    private readonly schema;
    constructor(schema: ZodSchema<T>);
    transform(value: unknown): T;
}
//# sourceMappingURL=zod-validation.pipe.d.ts.map