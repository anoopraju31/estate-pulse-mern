import express from 'express'

export const signUpController = (
	req: express.Request,
	res: express.Response,
) => {
	console.log(req.body)

	res.status(200)
	res.json({ message: 'ok' })
}
