import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);
