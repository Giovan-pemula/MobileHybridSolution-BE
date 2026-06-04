import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'

export type JwtPayload = string | object | Buffer

export function signToken(payload: JwtPayload, options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] }) {
  if (!env.JWT_SECRET) throw new Error('JWT_SECRET is not set')
  return jwt.sign(payload, env.JWT_SECRET, options)
}

export function verifyToken<T = jwt.JwtPayload>(token: string) {
  if (!env.JWT_SECRET) throw new Error('JWT_SECRET is not set')
  return jwt.verify(token, env.JWT_SECRET) as T
}

export function signRefreshToken(payload: JwtPayload, options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] }) {
  if (!env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not set')
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options)
}

export function verifyRefreshToken<T = jwt.JwtPayload>(token: string) {
  if (!env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not set')
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as T
}
