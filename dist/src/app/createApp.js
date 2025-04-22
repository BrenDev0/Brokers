"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const verifyHMAC_1 = require("../middleware/verifyHMAC");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: "Too many requests, please try again later.",
    });
    app.use(limiter);
    app.set('trust proxy', 1);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Apply HMAC conditionally
    const hmacExcludedPaths = [];
    if (process.env.NODE_ENV === 'production') {
        const secret = process.env.HMAC_SECRET;
        app.use((req, res, next) => {
            const shouldSkip = hmacExcludedPaths.some(path => req.path.startsWith(path));
            if (shouldSkip) {
                return next();
            }
            return (0, verifyHMAC_1.verifyHMAC)(secret)(req, res, next);
        });
    }
    return app;
};
exports.default = createApp;
