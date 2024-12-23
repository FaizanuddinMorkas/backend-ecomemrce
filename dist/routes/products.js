"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = require("../controllers/products");
var router = express_1.default.Router();
// API: Get all products
router.get('/', products_1.getProducts);
// API: Checkout cart
router.post('/checkout', products_1.checkoutProducts);
exports.default = router;
