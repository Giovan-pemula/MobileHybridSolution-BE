import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    courseIds: z.ZodArray<z.ZodNumber>;
    couponId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=order.validation.d.ts.map