import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/User.model'

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
		if (!username || !email || !password) {
			res.status(400).json({
				error: 'please fill all fields',
			})

			return
		}

		// * validation - check for valid username
		if (!usernameRegex.test(username)) {
			res.status(400).json({
				error:
					'Invalid username. Usernames can only contain alphabetic characters (A-Z, a-z).',
			})

			return
		}

		// * validation - check for invaild email
		if (!emailPattern.test(email)) {
			res.status(400).json({
				error: 'Invalid email address. Please enter a valid email.',
			})

			return
		}

		// * validation - check for password
		if (!passwordRegex.test(password) && password.length < 8) {
			res.status(400).json({
				error:
					'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
			})

			return
		}

		// ? hashing password
		const hashedPassword = await bcryptjs.hash(password, 12)
		const newUser = new User({ username, email, password: hashedPassword })

		await newUser.save()

		return res
			.status(201)
			.json({
				success: true,
				statusCode: 201,
				message: 'User created successfully!',
			})
	} catch (error) {
		//! console.error(error)

		next(error)
	}
}
