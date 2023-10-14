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

export const getListingById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const listing = await Listing.findById(req.params.id)

		if (!listing) return next(errorHandler(404, 'Listing does not exits'))

		return res.status(200).json({ success: true, listing })
	} catch (error) {
		next(error)
	}
}

export const updateListing = async (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const listing = await Listing.findById(req.params.id)

		if (!listing) return next(errorHandler(404, 'Listing does not exits'))

		if (req.user.id !== listing.userRef)
			return next(errorHandler(401, 'You can only delete your own listings!'))

		const updatedListing = await Listing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		)
		res.status(200).json({ success: true, listing: updatedListing })
	} catch (error) {
		next(error)
	}
}

export const getListings = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const limit: number = parseInt(req.query.limit as string) || 9
		const startIndex: number = parseInt(req.query.startIndex as string) || 0
		const searchTerm: string = (req.query.searchTerm as string) || ''
		const sort: string = (req.query.sort as string) || 'createdAt'
		const order = req.query.order === 'asc' ? 'asc' : 'desc'
		const offer =
			req.query.offer === undefined || req.query.offer === 'false'
				? { $in: [true, false] }
				: true
		const furnished =
			req.query.furnished === undefined || req.query.furnished === 'false'
				? { $in: [true, false] }
				: true
		const parking =
			req.query.parking === undefined || req.query.parking === 'false'
				? { $in: [true, false] }
				: true
		const type =
			req.query.type === undefined || req.query.type === 'all'
				? { $in: ['sale', 'rent'] }
				: req.query.type

		const listings = await Listing.find({
			name: { $regex: searchTerm, $options: 'i' },
			offer,
			furnished,
			parking,
			type,
		})
			.sort({ [sort]: order })
			.limit(limit)
			.skip(startIndex)

		return res.status(200).json(listings)
	} catch (error) {
		next(error)
	}
}
