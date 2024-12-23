import express from 'express';
import { addItemToCart, checkoutUserCart, clearUserCart, getUserCart, removeItemFromCart, updateItemQuantity } from '../controllers/cartController';
import { authMiddleware } from '../middleware/authMiddleware'; 

const router = express.Router();

// Fetch user cart
router.get('/', authMiddleware, getUserCart); 

// Route to add item to cart
router.post('/', authMiddleware, addItemToCart);

// Route for clearing a cart
router.delete('/', authMiddleware, clearUserCart); 

// Route to remove item from cart
router.delete('/:productId', authMiddleware, removeItemFromCart); 

// Route to update item quantity in cart
router.put('/', authMiddleware, updateItemQuantity); 

// Route to checkout user cart
router.post('/checkout', authMiddleware, checkoutUserCart); 

export default router;
