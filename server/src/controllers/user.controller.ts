import { Request, Response, NextFunction } from 'express'

export const test = (req: Request, res: Response) => {
	res.json({
		message: 'Api route is working',
	})
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
	res.json({
		message: 'Api route is working',
	})
}
