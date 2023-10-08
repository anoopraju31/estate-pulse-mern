import express from 'express'
import { test, updateUser } from '../controllers/user.controller'
import { verifyToken } from '../utills/verifyUser'

const router = express.Router()

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser)

export default router
