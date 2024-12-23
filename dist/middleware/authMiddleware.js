"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Auth middleware for JWT verification
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log("token ===>", token);
    if (!token) {
        res.status(401).json({ message: 'Unauthorized, no token.' });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded; // Now TypeScript understands that req.user can exist
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
