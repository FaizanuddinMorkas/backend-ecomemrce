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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutUserCart = exports.updateItemQuantity = exports.removeItemFromCart = exports.clearUserCart = exports.addItemToCart = exports.getUserCart = void 0;
var cartService_1 = require("../services/cartService"); // Adjust the import path as necessary
var mongoose_1 = require("mongoose");
// Get user cart
var getUserCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cart, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(403).json({ message: 'User is not authenticated.' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.getCart)(new mongoose_1.Types.ObjectId(userId))];
            case 2:
                cart = _b.sent();
                res.status(200).json(cart); // Return the cart or an empty cart object
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Error fetching cart', error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserCart = getUserCart;
// Add item to cart
var addItemToCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, quantity, userId, updatedCart, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, productId = _a.productId, quantity = _a.quantity;
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.addToCart)(new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(productId), +quantity)];
            case 2:
                updatedCart = _c.sent();
                res.status(200).json(updatedCart);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                res.status(500).json({ message: 'Error adding item to cart', error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addItemToCart = addItemToCart;
// Clear the cart
var clearUserCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, deletedCart, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(403).json({ message: 'User is not authenticated.' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.clearCart)(new mongoose_1.Types.ObjectId(userId))];
            case 2:
                deletedCart = _b.sent();
                res.status(200).json({ message: 'Cart cleared successfully.', cart: deletedCart });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Error clearing cart', error: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.clearUserCart = clearUserCart;
// Remove item from cart
var removeItemFromCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, userId, updatedCart, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                productId = req.params.productId;
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(403).json({ message: 'User is not authenticated.' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.removeFromCart)(new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(productId))];
            case 2:
                updatedCart = _b.sent();
                res.status(200).json(updatedCart);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).json({ message: 'Error removing item from cart', error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeItemFromCart = removeItemFromCart;
// Update quantity of item in cart
var updateItemQuantity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, quantity, userId, updatedCart, error_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, productId = _a.productId, quantity = _a.quantity;
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    res.status(403).json({ message: 'User is not authenticated.' });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.updateCartQuantity)(new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(productId), quantity)];
            case 2:
                updatedCart = _c.sent();
                res.status(200).json(updatedCart);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                res.status(500).json({ message: 'Error updating item quantity in cart', error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateItemQuantity = updateItemQuantity;
// Checkout user cart
var checkoutUserCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, results, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(403).json({ message: 'User is not authenticated.' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cartService_1.checkoutCart)(new mongoose_1.Types.ObjectId(userId))];
            case 2:
                results = _b.sent();
                res.status(200).json({ message: 'Checkout completed', results: results });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                res.status(500).json({ message: 'Error during checkout', error: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkoutUserCart = checkoutUserCart;
