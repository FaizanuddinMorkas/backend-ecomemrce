"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = exports.updateCartQuantity = exports.removeFromCart = exports.clearCart = exports.addToCart = exports.getCart = void 0;
var cart_1 = __importDefault(require("../models/cart")); // Adjust the path as necessary
var order_1 = __importDefault(require("../models/order"));
var product_1 = __importDefault(require("../models/product"));
// Function to get the user's cart
var getCart = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId }).populate('items.productId')];
            case 1:
                cart = _a.sent();
                return [2 /*return*/, cart !== null && cart !== void 0 ? cart : []];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching cart:', error_1.message);
                throw error_1; // Rethrow or handle the error as needed
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCart = getCart;
// Function to add an item to the cart
var addToCart = function (userId, productId, quantity) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, existingItemIndex, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 1:
                cart = _a.sent();
                // If cart doesn't exist, create one
                if (!cart) {
                    cart = new cart_1.default({ userId: userId, items: [] });
                }
                existingItemIndex = cart.items.findIndex(function (item) { return item.productId.equals(productId); });
                if (existingItemIndex > -1) {
                    // If it exists, update the quantity
                    cart.items[existingItemIndex].quantity += quantity;
                }
                else {
                    // If it's a new product, push a new item to the cart
                    cart.items.push({ productId: productId, quantity: quantity });
                }
                // Save the cart
                return [4 /*yield*/, cart.save()];
            case 2:
                // Save the cart
                _a.sent();
                return [2 /*return*/, cart]; // Return the updated cart
            case 3:
                error_2 = _a.sent();
                console.error('Error adding to cart:', error_2.message);
                throw error_2; // Rethrow or handle the error as needed
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addToCart = addToCart;
// Function to clear the cart
var clearCart = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.default.findOneAndDelete({ userId: userId })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result]; // Return the deleted cart if needed
            case 2:
                error_3 = _a.sent();
                console.error('Error clearing cart:', error_3.message);
                throw error_3; // Rethrow or handle the error as needed
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.clearCart = clearCart;
// Function to remove an item from the cart
var removeFromCart = function (userId, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 1:
                cart = _a.sent();
                if (!cart) {
                    throw new Error('Cart not found');
                }
                cart.items = cart.items.filter(function (item) { return !item.productId.equals(productId); }); // Remove the item
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart]; // Return the updated cart
            case 3:
                error_4 = _a.sent();
                console.error('Error removing item from cart:', error_4.message);
                throw error_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeFromCart = removeFromCart;
// Function to update the quantity of an item in the cart
var updateCartQuantity = function (userId, productId, quantity) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, existingItemIndex, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 1:
                cart = _a.sent();
                if (!cart) {
                    throw new Error('Cart not found');
                }
                existingItemIndex = cart.items.findIndex(function (item) { return item.productId.equals(productId); });
                if (existingItemIndex > -1) {
                    if (quantity <= 0) {
                        // If the quantity is less than or equal to 0, remove the item
                        cart.items.splice(existingItemIndex, 1);
                    }
                    else {
                        // If quantity is valid, update it
                        cart.items[existingItemIndex].quantity = quantity;
                    }
                }
                else {
                    throw new Error('Item not found in cart');
                }
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, cart]; // Return the updated cart
            case 3:
                error_5 = _a.sent();
                console.error('Error updating cart quantity:', error_5.message);
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCartQuantity = updateCartQuantity;
// Checkout function to process cart items
var checkoutCart = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, results, totalAmount, orderItems, _i, _a, item, product, order, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId }).populate('items.productId')];
            case 1:
                cart = _b.sent();
                if (!cart || cart.items.length === 0) {
                    throw new Error('Cart is empty or not found');
                }
                results = [];
                totalAmount = 0;
                orderItems = [];
                _i = 0, _a = cart.items;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                item = _a[_i];
                return [4 /*yield*/, product_1.default.findById(item.productId)];
            case 3:
                product = _b.sent();
                if (!product) {
                    results.push({ productId: item.productId, message: 'Product not found' });
                    return [3 /*break*/, 5];
                }
                if (product.stock < item.quantity) {
                    results.push({ productId: item.productId, message: 'Insufficient stock' });
                    return [3 /*break*/, 5];
                }
                // Update stock and save product
                product.stock -= item.quantity;
                return [4 /*yield*/, product.save()];
            case 4:
                _b.sent();
                results.push({ productId: item.productId, message: 'Checked out successfully', quantity: item.quantity });
                // Calculate total amount (you can modify this to include price logic if necessary)
                totalAmount += product.price * item.quantity; // assuming product.price exists
                // Push item details to orderItems
                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    name: product.name, // Assuming product has a name attribute
                    price: product.price,
                    description: product.description, // Assuming product has a description attribute
                });
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                order = new order_1.default({
                    userId: userId,
                    items: orderItems,
                    totalAmount: totalAmount,
                });
                return [4 /*yield*/, order.save()];
            case 7:
                _b.sent();
                // Optionally clear the cart after checkout
                return [4 /*yield*/, cart_1.default.findOneAndDelete({ userId: userId })];
            case 8:
                // Optionally clear the cart after checkout
                _b.sent();
                return [2 /*return*/, { cart: results, order: order }]; // Return checkout results and order details
            case 9:
                error_6 = _b.sent();
                console.error('Error during checkout:', error_6.message);
                throw error_6; // Rethrow or handle the error as needed
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.checkoutCart = checkoutCart;
