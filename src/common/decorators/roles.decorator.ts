import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Attach required roles to a route handler or controller.
 * Used together with RolesGuard.
 *
 * @example
 * @Roles('ADMIN')
 * @Roles('TRAINER', 'ADMIN')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
