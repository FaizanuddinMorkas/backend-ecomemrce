import express from 'express';
import { getProducts, checkoutProducts } from '../controllers/products';

const router = express.Router();

// API: Get all products
router.get('/', getProducts);

// API: Checkout cart
router.post('/checkout', checkoutProducts);

export default router;
