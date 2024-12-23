import { Request, Response } from 'express';
import { addToCart, checkoutCart, clearCart, getCart, removeFromCart, updateCartQuantity } from '../services/cartService'; // Adjust the import path as necessary
import { Types } from 'mongoose';

// Get user cart
export const getUserCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return
    }

    try {
        const cart = await getCart(new Types.ObjectId(userId));
        res.status(200).json(cart); // Return the cart or an empty cart object
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    try {
        const updatedCart = await addToCart(new Types.ObjectId(userId), new Types.ObjectId(productId), +quantity);
        res.status(200).json(updatedCart);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

// Clear the cart
export const clearUserCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return
    }

    try {
        const deletedCart = await clearCart(new Types.ObjectId(userId));
        res.status(200).json({ message: 'Cart cleared successfully.', cart: deletedCart });
    } catch (error: any) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return
    }

    try {
        const updatedCart = await removeFromCart(new Types.ObjectId(userId), new Types.ObjectId(productId));
        res.status(200).json(updatedCart);
    } catch (error: any) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};

// Update quantity of item in cart
export const updateItemQuantity = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return
    }

    try {
        const updatedCart = await updateCartQuantity(new Types.ObjectId(userId), new Types.ObjectId(productId), quantity);
        res.status(200).json(updatedCart);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating item quantity in cart', error: error.message });
    }
};

// Checkout user cart
export const checkoutUserCart = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return;
    }

    try {
        const results = await checkoutCart(new Types.ObjectId(userId));
        res.status(200).json({ message: 'Checkout completed', results });
    } catch (error: any) {
        res.status(500).json({ message: 'Error during checkout', error: error.message });
    }
};