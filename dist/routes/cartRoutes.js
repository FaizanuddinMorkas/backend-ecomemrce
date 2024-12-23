"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cartController_1 = require("../controllers/cartController"); // Adjust the path as needed
var authMiddleware_1 = require("../middleware/authMiddleware"); // Middleware to ensure user is authenticated
var router = express_1.default.Router();
router.get('/', authMiddleware_1.authMiddleware, cartController_1.getUserCart); // Fetch user cart
// Route to add item to cart
router.post('/', authMiddleware_1.authMiddleware, cartController_1.addItemToCart);
router.delete('/', authMiddleware_1.authMiddleware, cartController_1.clearUserCart); // Using DELETE for clearing a cart
// Route to remove item from cart
router.delete('/:productId', authMiddleware_1.authMiddleware, cartController_1.removeItemFromCart); // Remove item by productId
// Route to update item quantity in cart
router.put('/', authMiddleware_1.authMiddleware, cartController_1.updateItemQuantity); // Update item quantity
// Route to checkout user cart
router.post('/checkout', authMiddleware_1.authMiddleware, cartController_1.checkoutUserCart); // Checkout route
exports.default = router;
