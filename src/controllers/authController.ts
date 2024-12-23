import { Request, Response } from 'express';
import { register, login } from '../services/authService'; // Adjust import as necessary

// Register user
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newUser = await register(username, password);
    if (!newUser) {
        res.status(400).json({ message: 'User registration failed.' });
        return;
    }

    res.status(201).json({ message: 'User registered successfully.', username: newUser.username });
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const token = await login(username, password);
    if (!token) {
        res.status(401).json({ message: 'Invalid username or password.' });
        return
    }

    res.json({ token });
};
