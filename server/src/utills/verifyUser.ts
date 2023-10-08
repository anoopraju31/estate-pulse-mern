import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { errorHandler } from './error'

export interface UserRequest extends Request {
	user: {
		id: string
	}
}

interface User {
	id: string
}

export const verifyToken = (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.access_token

	if (!token) return next(errorHandler(401, 'Unauthorized'))

	jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: User) => {
		if (err) return next(errorHandler(403, 'Forbidden'))

		req.user = user
		next()
	})
}
