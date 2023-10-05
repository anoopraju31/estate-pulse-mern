import { Request, Response, NextFunction } from 'express'
export const errorHandler = (
	err: Error | any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const statusCode = err.status || 500
	const message = err.message || 'Internal Server Error'

	return res.status(statusCode).json({ message })
}
