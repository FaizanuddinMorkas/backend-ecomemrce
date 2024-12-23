"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../controllers/orderController"); // Adjust the import path
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
// Route to get user orders
router.get('/', authMiddleware_1.authMiddleware, orderController_1.fetchUserOrders);
exports.default = router;
