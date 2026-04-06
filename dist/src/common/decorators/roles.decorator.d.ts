export declare const ROLES_KEY = "roles";
/**
 * Attach required roles to a route handler or controller.
 * Used together with RolesGuard.
 *
 * @example
 * @Roles('ADMIN')
 * @Roles('TRAINER', 'ADMIN')
 */
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
//# sourceMappingURL=roles.decorator.d.ts.map