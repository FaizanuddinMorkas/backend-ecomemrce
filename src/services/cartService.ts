import Cart from '../models/cart'; // Adjust the path as necessary
import { Types } from 'mongoose';
import Order from '../models/order';
import Product from '../models/product';

// Function to get the user's cart
export const getCart = async (userId: Types.ObjectId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details
        return cart ?? [];
    } catch (error: any) {
        console.error('Error fetching cart:', error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Function to add an item to the cart
export const addToCart = async (userId: Types.ObjectId, productId: Types.ObjectId, quantity: number) => {
    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));

        if (existingItemIndex > -1) {
            // If it exists, update the quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If it's a new product, push a new item to the cart
            cart.items.push({ productId, quantity });
        }

        // Save the cart
        await cart.save();
        return cart; // Return the updated cart
    } catch (error: any) {
        console.error('Error adding to cart:', error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Function to clear the cart
export const clearCart = async (userId: Types.ObjectId) => {
    try {
        const result = await Cart.findOneAndDelete({ userId }); // Deletes the cart for the user
        return result; // Return the deleted cart if needed
    } catch (error: any) {
        console.error('Error clearing cart:', error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Function to remove an item from the cart
export const removeFromCart = async (userId: Types.ObjectId, productId: Types.ObjectId) => {
    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId)); // Remove the item

        await cart.save();
        return cart; // Return the updated cart
    } catch (error: any) {
        console.error('Error removing item from cart:', error.message);
        throw error;
    }
};

// Function to update the quantity of an item in the cart
export const updateCartQuantity = async (userId: Types.ObjectId, productId: Types.ObjectId, quantity: number) => {
    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));

        if (existingItemIndex > -1) {
            if (quantity <= 0) {
                // If the quantity is less than or equal to 0, remove the item
                cart.items.splice(existingItemIndex, 1);
            } else {
                // If quantity is valid, update it
                cart.items[existingItemIndex].quantity = quantity;
            }
        } else {
            throw new Error('Item not found in cart');
        }

        await cart.save();
        return cart; // Return the updated cart
    } catch (error: any) {
        console.error('Error updating cart quantity:', error.message);
        throw error;
    }
};

// Checkout function to process cart items
export const checkoutCart = async (userId: Types.ObjectId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty or not found');
        }

        const results = []; // To store checkout results
        let totalAmount = 0; // To calculate total amount
        const orderItems = []; // To store the items for the order

        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                results.push({ productId: item.productId, message: 'Product not found' });
                continue;
            }

            if (product.stock < item.quantity) {
                results.push({ productId: item.productId, message: 'Insufficient stock' });
                continue;
            }

            // Update stock and save product
            product.stock -= item.quantity;
            await product.save();
            results.push({ productId: item.productId, message: 'Checked out successfully', quantity: item.quantity });

            // Calculate total amount (you can modify this to include price logic if necessary)
            totalAmount += product.price * item.quantity; // assuming product.price exists
            // Push item details to orderItems
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                name: product.name, // Assuming product has a name attribute
                price: product.price,
                description: product.description, // Assuming product has a description attribute
            });
        }

        // Create an order after successful checkout
        const order = new Order({
            userId,
            items: orderItems,
            totalAmount,
        });
        await order.save();

        // Optionally clear the cart after checkout
        await Cart.findOneAndDelete({ userId });

        return { cart: results, order }; // Return checkout results and order details
    } catch (error: any) {
        console.error('Error during checkout:', error.message);
        throw error; // Rethrow or handle the error as needed
    }
};