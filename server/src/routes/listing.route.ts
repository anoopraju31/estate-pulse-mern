import express from 'express'
import { verifyToken } from '../utills/verifyUser'
import { createListing } from '../controllers/listing.controller'

const router = express.Router()

router.post('/create', verifyToken, createListing)

export default router
