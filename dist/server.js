"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Ensure you import Request and Response
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("./config/db"));
var products_1 = __importDefault(require("./routes/products"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var cartRoutes_1 = __importDefault(require("./routes/cartRoutes")); // Import cart routes
var orderRoutes_1 = __importDefault(require("./routes/orderRoutes")); // Import cart routes
dotenv_1.default.config();
(0, db_1.default)();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.default.Server(server);
app.use(express_1.default.json());
app.use('/api/products', products_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/order', orderRoutes_1.default);
// Health Check Route
app.get('/health', function (req, res) {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});
// WebSocket for real-time stock updates
io.on('connection', function (socket) {
    console.log('New client connected');
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
// Start server
var PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
