import { Request, Response, NextFunction } from 'express'

export const createListing = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.json({
			message: 'Api route is working',
		})
	} catch (error) {
		next(error)
	}
}
