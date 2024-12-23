import mongoose from 'mongoose';
import User from '../models/user'; // Adjust the import path as necessary
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();
// Function to generate a random alphanumeric password
const generateRandomPassword = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
};

// Main function to register a random user
const registerRandomUser = async () => {
    try {
        // Connect to your MongoDB
        await mongoose.connect(process.env.MONGODB_URI!);

        // Generate random user data using Faker
        const username = faker.internet.username(); // Generate a random username
        const password = generateRandomPassword(10); // Generate a random 10-character password

        // Log the generated user information
        console.log(`Generated User: ${username} (Password: ${password})`);

        // Create a new user instance
        const newUser = new User({ username, password }); // Assuming User model only requires username and password
        await newUser.save(); // Save the user to the database

        console.log(`User registered successfully: ${username}`);

    } catch (error: any) {
        console.error('Error registering user:', error.message);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Execute the script
registerRandomUser();

//Daisy_Nader55 (Password: HJsMYksJ9E)