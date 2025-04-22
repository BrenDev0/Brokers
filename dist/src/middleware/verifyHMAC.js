"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHMAC = verifyHMAC;
// middleware/verifyHMAC.ts
const crypto_1 = __importDefault(require("crypto"));
function verifyHMAC(secret, allowedDrift = 60000) {
    return (req, res, next) => {
        const signature = req.headers['x-signature'];
        const payload = req.headers['x-payload'];
        if (!signature || !payload) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const timestamp = parseInt(payload);
        if (isNaN(timestamp) || Math.abs(Date.now() - timestamp) > allowedDrift) {
            return res.status(403).json({ message: 'Invalid or expired payload timestamp' });
        }
        const expected = crypto_1.default
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
        if (signature !== expected) {
            return res.status(403).json({ message: 'Forbidden.' });
        }
        next();
    };
}
