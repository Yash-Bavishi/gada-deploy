import express from 'express'
import { getCartItems, addToCart, removeFromCart } from '../controllers/cartController.js'
const router = express.Router()

router.route('/').get(getCartItems)
router.route('/add/:itemName/:count').post(addToCart)
router.route('/delete/:itemName').delete(removeFromCart)

export default router
