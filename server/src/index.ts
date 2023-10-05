import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}.`)
})
