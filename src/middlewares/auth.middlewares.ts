import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { unauthorized } from '../utils/response'

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorized(res, 'Access token is required')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = verifyToken<{ id: number; email: string }>(token!)

        req.user = {
            id: payload.id,
            email: payload.email,
        }

        next()
    } catch {
        return unauthorized(res, 'Invalid or expired token')
    }
}
