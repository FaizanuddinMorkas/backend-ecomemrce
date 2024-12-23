import { Request, Response } from 'express';
import { getUserOrders } from '../services/orderService'; // Import the service
import { Types } from 'mongoose';

// Get user's orders
export const fetchUserOrders = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(403).json({ message: 'User is not authenticated.' });
        return
    }

    try {
        const orders = await getUserOrders(new Types.ObjectId(userId));
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
