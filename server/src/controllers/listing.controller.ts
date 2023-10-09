import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../middlewares/errorHandler.middleware'
import Listing from '../models/Listing.model'
import { validateListing } from '../utills/validateListing'

export const createListing = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validationResult = validateListing(req.body)

		if (!validationResult.isValid) {
			return next(validationResult?.error)
		}

		const listing = await Listing.create(req.body)
		return res.status(201).json({
			success: true,
			listing,
		})
	} catch (error) {
		next(error)
	}
}
