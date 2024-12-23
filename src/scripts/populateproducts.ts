import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product';

dotenv.config();

const productsData = [
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with all features.',
      image: 'https://shorturl.at/ZHyaF',
      price: 15000
    },
    {
      name: 'Laptop',
      description: 'High-performance laptop suitable for gaming and work.',
      image: 'https://shorturl.at/uoWs3',
      price: 50000
    },
    {
      name: 'Headphones',
      description: 'Noise-canceling wireless headphones with amazing sound.',
      image: 'https://shorturl.at/mHhF4',
      price: 1500
    },
    {
      name: 'Smartwatch',
      description: 'Multifunctional smartwatch with fitness tracking.',
      image: 'https://shorturl.at/VEqh8',
      price: 1500
    },
    {
      name: 'Tablet',
      description: 'High-resolution tablet perfect for media consumption.',
      image: 'https://tinyurl.com/4bzwc95z',
      price: 10000
    },
    {
      name: 'Camera',
      description: 'DSLR camera for professional photography.',
      image: 'https://tinyurl.com/3nyyh993',
      price: 45000
    },
    {
      name: 'Monitor',
      description: 'Ultra HD monitor with great color accuracy.',
      image: 'https://tinyurl.com/55yvhsee',
      price: 7500
    },
    {
      name: 'Gaming Console',
      description: 'Next-gen gaming console with immersive experience.',
      image: 'https://tinyurl.com/6s9vxs4v',
      price: 40000
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound.',
      image: 'https://tinyurl.com/yf99esbh',
      price: 700
    },
    {
      name: 'Charger',
      description: 'Fast charger for all your devices.',
      image: 'https://tinyurl.com/5z7fa8ad',
      price: 1500
    }
  ];
  
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Function to generate random product data
const generateRandomProduct = () => {
  const randomIndex = Math.floor(Math.random() * productsData.length);
//   const price = Math.floor(Math.random() * (2000 - 100 + 1) + 100);
  const stock = Math.floor(Math.random() * 100) + 1;

  const selectedProduct = productsData[randomIndex];

  return {
    id: new Types.ObjectId(),
    name: selectedProduct.name,
    description: selectedProduct.description,
    price: selectedProduct.price,
    stock: stock,
    image: selectedProduct.image
  };
};

// Function to add or update products in the database
const addOrUpdateProducts = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const randomProduct = generateRandomProduct();

    // Check if the product already exists
    const existingProduct = await Product.findOne({ name: randomProduct.name });

    if (existingProduct) {
      // Update existing product's stock and price
      existingProduct.stock += randomProduct.stock;
      existingProduct.price = randomProduct.price; 
      existingProduct.image = randomProduct.image;
      await existingProduct.save();
      console.log(`Updated product: ${existingProduct.name} (ID: ${existingProduct._id})`);
    } else {
      // Insert new product
      await Product.create(randomProduct);
      console.log(`Added new product: ${randomProduct.name} (ID: ${randomProduct.id})`);
    }
  }
};

const populateProducts = async () => {
  try {
    const productCount = 10;
    await addOrUpdateProducts(productCount);
    console.log('Product population complete!');
  } catch (error) {
    console.error('Error populating products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Execute the script
const run = async () => {
  await connectDB();
  await populateProducts();
};

run();
