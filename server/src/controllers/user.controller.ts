import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utills/error'
import { UserRequest } from '../utills/verifyUser'
import User from '../models/User.model'

export const test = (req: Request, res: Response) => {
	res.json({
		message: 'Api route is working',
	})
}

export const updateUser = async (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.user.id !== req.params.id)
		return next(errorHandler(401, 'You can only update your own account'))

	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10)
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					avatar: req.body.avatar,
				},
			},
			{
				new: true,
			},
		)

		res.status(200).json({
			success: true,
			id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			avatar: updatedUser.avatar,
			createdAt: updatedUser.createdAt,
			updatedAt: updatedUser.updatedAt,
		})
	} catch (error) {
		next(error)
	}
}

export const deleteUser = async (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.user.id !== req.params.id)
		return next(errorHandler(401, 'You can only update your own account'))

	try {
		await User.findByIdAndDelete(req.params.id)
		res.clearCookie('access_token')
		res.status(200).json('User has been deleted!')
	} catch (error) {
		console.log(error)
		next(error)
	}
}
