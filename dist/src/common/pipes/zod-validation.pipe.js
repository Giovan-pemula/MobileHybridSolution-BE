"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
/**
 * A generic NestJS pipe that validates the incoming value against a Zod schema.
 * Use it with @Body(), @Query(), or @Param() decorators.
 *
 * @example
 * @Post('login')
 * async login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) { ... }
 */
class ZodValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            throw new common_1.BadRequestException({
                message: 'Invalid input',
                errors: result.error.format(),
            });
        }
        return result.data;
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod-validation.pipe.js.map