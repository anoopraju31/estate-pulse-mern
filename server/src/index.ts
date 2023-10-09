import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { authRouter, listingRoute, userRouter } from './routes'

dotenv.config()

// * MongoDB Connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.error(error)
	})

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listind', listingRoute)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}.`)
})
