import User from '../models/user'; // Adjust the import path as necessary
import bcrypt from 'bcrypt'; // Ensure you import bcrypt if you're hashing passwords
import jwt from 'jsonwebtoken';

export interface UserResponse {
    username: string;
    password: string;
}

export const register = async (username: string, password: string) => {
    // Hash the password manually
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('hashedPassword', hashedPassword)

    // Create a new user instance with the hashed password
    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save(); // Save the user to the database
        return newUser; // Optionally return the new user
    } catch (error: any) {
        console.error('Error registering user:', error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) {
        return null; // User not found
    }

    // Compare the entered password with the stored password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return null; // Invalid password
    }

    // Password is valid; you could generate and return a JWT token or user details
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token; // Or return the token
};