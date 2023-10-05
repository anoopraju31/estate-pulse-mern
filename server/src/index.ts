import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import { errorHandler } from './middleware/errorHandler.middleware'

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

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}.`)
})
