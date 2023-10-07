import express from 'express'

import {
	signInController,
	signUpController,
	googleSignInController,
} from '../controllers/auth.controller'

const router = express.Router()

router.post('/sign-up', signUpController)
router.post('/sign-in', signInController)
router.post('/google', googleSignInController)

export default router
