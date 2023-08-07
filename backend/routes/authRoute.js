import express from 'express'
const router = express.Router()
import { loginRoute, logoutRoute, registerRoute, profileRoute } from '../controllers/userController.js'
import { errorHandler } from '../middleware/errorHandler.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
router.route('/auth').post(registerRoute) 
router.route('/login').post(loginRoute)
router.route('/profile').post(authMiddleware, profileRoute)
router.route('/logout').post(authMiddleware, logoutRoute)

export default router