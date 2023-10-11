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
		console.log(req.body)

		const validationResult = validateListing(req.body)

		console.log('validationResult', validationResult)

		if (!validationResult.isValid) {
			return next(validationResult?.error)
		}

		const listing = await Listing.create(req.body)
		return res.status(201).json({
			success: true,
			listing,
		})
	} catch (error) {
		console.log(error)

		next(error)
	}
}
