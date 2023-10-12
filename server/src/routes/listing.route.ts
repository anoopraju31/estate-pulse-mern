import express from 'express'
import { verifyToken } from '../utills/verifyUser'
import {
	createListing,
	deleteListing,
	getListingById,
	updateListing,
} from '../controllers/listing.controller'

const router = express.Router()

router.get('/:id', verifyToken, getListingById)
router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.patch('/update/:id', verifyToken, updateListing)

export default router
