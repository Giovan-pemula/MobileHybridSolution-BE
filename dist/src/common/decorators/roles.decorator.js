"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
/**
 * Attach required roles to a route handler or controller.
 * Used together with RolesGuard.
 *
 * @example
 * @Roles('ADMIN')
 * @Roles('TRAINER', 'ADMIN')
 */
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map