import express from 'express'
import { verifyToken } from '../utills/verifyUser'
import { createListing, deleteListing } from '../controllers/listing.controller'

const router = express.Router()

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)

export default router
