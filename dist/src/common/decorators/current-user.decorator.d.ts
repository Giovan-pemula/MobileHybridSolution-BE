export interface CurrentUserPayload {
    id: number;
    email: string;
    role: string;
}
/**
 * Parameter decorator that extracts the authenticated user from the request.
 * JwtAuthGuard must run before this decorator is used.
 *
 * @example
 * async getProfile(@CurrentUser() user: CurrentUserPayload) { ... }
 */
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=current-user.decorator.d.ts.map