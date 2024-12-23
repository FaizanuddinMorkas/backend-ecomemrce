import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product'; // Adjust the path as necessary

dotenv.config();

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
    const productNames = [
        'Smartphone',
        'Laptop',
        'Headphones',
        'Smartwatch',
        'Tablet',
        'Camera',
        'Monitor',
        'Gaming Console',
        'Bluetooth Speaker',
        'Charger'
    ];

    const productDescriptions = [
        'Latest model smartphone with all features.',
        'High-performance laptop suitable for gaming and work.',
        'Noise-canceling wireless headphones with amazing sound.',
        'Multifunctional smartwatch with fitness tracking.',
        'High-resolution tablet perfect for media consumption.',
        'DSLR camera for professional photography.',
        'Ultra HD monitor with great color accuracy.',
        'Next-gen gaming console with immersive experience.',
        'Portable Bluetooth speaker with excellent sound.',
        'Fast charger for all your devices.'
    ];

    const randomIndex = Math.floor(Math.random() * productNames.length);
    const price = Math.floor(Math.random() * (2000 - 100 + 1) + 100); // Generate random price rounded to nearest whole number
    const stock = Math.floor(Math.random() * 100) + 1; // Random stock between 1 and 100

    return {
        id: new Types.ObjectId(), // Generate new ObjectId for the product
        name: productNames[randomIndex],
        description: productDescriptions[randomIndex],
        price: price,
        stock: stock,
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
            existingProduct.stock += randomProduct.stock; // Increment stock
            existingProduct.price = randomProduct.price; // Update price
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
        const productCount = 10; // Specify how many products to generate
        await addOrUpdateProducts(productCount);
        console.log('Product population complete!');
    } catch (error) {
        console.error('Error populating products:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

// Execute the script
const run = async () => {
    await connectDB();
    await populateProducts();
};

run();
