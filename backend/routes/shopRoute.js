import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
import { getAllItem, getItem, postItem, putItem } from '../controllers/shopController.js';

router.route('/:itemName/:count').post(authMiddleware, postItem).put(authMiddleware, putItem)
router.route('/:itemName').get(getItem)
router.route('/').get(getAllItem)

export default router