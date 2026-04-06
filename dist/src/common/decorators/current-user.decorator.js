"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
/**
 * Parameter decorator that extracts the authenticated user from the request.
 * JwtAuthGuard must run before this decorator is used.
 *
 * @example
 * async getProfile(@CurrentUser() user: CurrentUserPayload) { ... }
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map