import Order from '../models/order'; // Adjust the path as necessary
import { Types } from 'mongoose';

// Service to get orders for a user
export const getUserOrders = async (userId: Types.ObjectId) => {
    return await Order.find({ userId }); // Populate product details
};
