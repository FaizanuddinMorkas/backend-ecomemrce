import mongoose, { Document, Schema } from 'mongoose';

// interface for order items
interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

// Order interface
interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    createdAt: Date;
}

// Create the Order schema
const orderSchema = new Schema<IOrder>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Order model
const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
