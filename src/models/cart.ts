import mongoose, { Document, Schema } from 'mongoose';

//  interface for cart items
interface ICartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

// Cart interface
interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
}

// Cart schema
const cartSchema = new Schema<ICart>({
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
        },
    ],
});

// Create and export the Cart model
const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;
