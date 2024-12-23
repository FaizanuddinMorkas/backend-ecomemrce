import express from 'express';
import { fetchUserOrders } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get user orders
router.get('/', authMiddleware, fetchUserOrders);

export default router;
