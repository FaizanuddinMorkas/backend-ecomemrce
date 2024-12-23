import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Auth middleware for JWT verification
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    console.log(`token ===>`, token)
    if (!token) {
        res.status(401).json({ message: 'Unauthorized, no token.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded)
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
        return
    }
};
