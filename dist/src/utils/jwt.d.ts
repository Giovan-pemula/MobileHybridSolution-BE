import jwt, { SignOptions } from 'jsonwebtoken';
export type JwtPayload = string | object | Buffer;
export declare function signToken(payload: JwtPayload, options?: SignOptions): string;
export declare function verifyToken<T = jwt.JwtPayload>(token: string): T;
export declare function signRefreshToken(payload: JwtPayload, options?: SignOptions): string;
export declare function verifyRefreshToken<T = jwt.JwtPayload>(token: string): T;
//# sourceMappingURL=jwt.d.ts.map