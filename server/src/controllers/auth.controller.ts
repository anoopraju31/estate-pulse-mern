import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.model'
import { errorHandler } from '../utills/error'

// * regex patterns
const usernameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const signUpController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, email, password } = req.body

		// * validation - check for all fields are present or not
		if (!username || !email || !password)
			return res.status(400).json({
				error: 'please fill all fields',
			})

		// * validation - check for valid username
		if (!usernameRegex.test(username))
			return res.status(400).json({
				error:
					'Invalid username. Usernames can only contain alphabetic characters (A-Z, a-z).',
			})

		// * validation - check for invaild email
		if (!emailPattern.test(email))
			return res.status(400).json({
				error: 'Invalid email address. Please enter a valid email.',
			})

		// * validation - check for password
		if (!passwordRegex.test(password) && password.length < 8)
			return res.status(400).json({
				error:
					'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
			})

		// ? hashing password
		const hashedPassword = await bcryptjs.hash(password, 10)
		const newUser = new User({ username, email, password: hashedPassword })

		await newUser.save()

		return res.status(201).json({
			success: true,
			statusCode: 201,
			message: 'User created successfully!',
		})
	} catch (error) {
		//! console.error(error)
		next(error)
	}
}

export const signInController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body

		// * validation - check for all fields are present or not
		if (!email || !password)
			return res.status(400).json({
				error: 'please fill all fields',
			})

		// * validation - check for invaild email
		if (!emailPattern.test(email))
			return res.status(400).json({
				error: 'Invalid email address. Please enter a valid email.',
			})

		// Check for a valid user
		const validUser = await User.findOne({ email })

		// if invalid user
		if (!validUser) return next(errorHandler(404, 'User not found!'))

		// validate password
		const validPassword = bcryptjs.compareSync(password, validUser.password)

		// if invalid password
		if (!validPassword) return next(errorHandler(401, 'Invalid password'))

		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

		res.cookie('access_token', token, { httpOnly: true }).status(200).json({
			success: true,
			id: validUser._id,
			username: validUser.username,
			email: validUser.email,
			avatar: validUser.avatar,
			createdAt: validUser.createdAt,
			updatedAt: validUser.updatedAt,
		})
	} catch (error) {
		//! console.error(error)
		next(error)
	}
}

export const googleSignInController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		let user = await User.findOne({ email: req.body.email })

		// console.log(user)

		if (!user) {
			console.log('helloworld')
			const generatePassword = Math.random().toString(36).slice(-8)
			const hashedPassword = bcryptjs.hashSync(generatePassword, 10)
			user = new User({
				username:
					req.body.name.split(' ').join('').toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: req.body.email,
				password: hashedPassword,
				avatar: req.body.photo,
			})

			await user.save()
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
		res.cookie('access_token', token, { httpOnly: true }).status(200).json({
			success: true,
			id: user._id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			avatar: user.avatar,
		})
	} catch (error) {
		// console.log(error)
		next(error)
	}
}
