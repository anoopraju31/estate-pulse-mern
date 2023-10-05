import express from 'express'
import User from '../models/User.model'

export const signUpController = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { username, email, password } = req.body

		if (!username || !email || !password) {
			return res.status(400).json({
				message: '',
			})
		}

		const newUser = new User({ username, email, password })

		await newUser.save()

		res.status(201).json({ message: 'User created successfully!' })
	} catch (error) {
		console.error(error)
		return res.sendStatus(400).json({ message: error.message })
	}
}
