import express, { Request, Response } from 'express'; // Ensure you import Request and Response
import http from 'http';
import socketIo from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/products';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes'; // Import cart routes
import orderRoutes from './routes/orderRoutes'; // Import cart routes
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

app.use(express.json());
app.use(cors({ origin: '*' }))
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);


// Health Check Route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// WebSocket for real-time stock updates
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
