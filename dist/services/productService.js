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
exports.checkout = exports.getProductList = void 0;
var product_1 = __importDefault(require("../models/product")); // Adjust the path as necessary
// Function to retrieve all products
var getProductList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.find({})];
            case 1:
                products = _a.sent();
                return [2 /*return*/, products]; // Return the product list
            case 2:
                error_1 = _a.sent();
                throw new Error('Error retrieving products: ' + error_1.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductList = getProductList;
// Function to checkout products
var checkout = function (items) { return __awaiter(void 0, void 0, void 0, function () {
    var results, _i, items_1, item, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                results = [];
                _i = 0, items_1 = items;
                _a.label = 1;
            case 1:
                if (!(_i < items_1.length)) return [3 /*break*/, 5];
                item = items_1[_i];
                return [4 /*yield*/, product_1.default.findById(item.id)];
            case 2:
                product = _a.sent();
                if (!product) {
                    results.push("Product with ID ".concat(item.id, " not found."));
                    return [3 /*break*/, 4];
                }
                if (product.stock < item.quantity) {
                    results.push("Insufficient stock for ".concat(product.name, "."));
                    return [3 /*break*/, 4];
                }
                product.stock -= item.quantity;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                results.push("Checked out ".concat(item.quantity, " of ").concat(product.name, "."));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, results];
        }
    });
}); };
exports.checkout = checkout;
