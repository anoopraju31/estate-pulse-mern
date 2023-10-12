import { Request, Response, NextFunction } from 'express'
import Listing from '../models/Listing.model'
import { UserRequest } from '../utills/verifyUser'
import { errorHandler } from '../utills/error'
import { validateListing } from '../utills/validateListing'

export const createListing = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.body)

		const validationResult = validateListing(req.body)

		// console.log('validationResult', validationResult)

		if (!validationResult.isValid) {
			return next(validationResult?.error)
		}

		const listing = await Listing.create(req.body)
		return res.status(201).json({
			success: true,
			listing,
		})
	} catch (error) {
		// console.log(error)

		next(error)
	}
}

export const deleteListing = async (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const listing = await Listing.findById(req.params.id)

		if (!listing) return next(errorHandler(404, 'Listing does not exits'))

		if (req.user.id !== listing.userRef)
			return next(errorHandler(401, 'You can only delete your own listings!'))

		await Listing.findByIdAndDelete(req.params.id)
		return res
			.status(200)
			.json({ success: true, message: 'Listing has been deleted!' })
	} catch (error) {
		next(error)
	}
}
