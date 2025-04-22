// middleware/verifyHMAC.ts
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function verifyHMAC(secret: string, allowedDrift = 60_000) {
  return (req: Request, res: Response, next: NextFunction): any => {
    const signature = req.headers['x-signature'] as string;
    const payload = req.headers['x-payload'] as string;

    if (!signature || !payload) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const timestamp = parseInt(payload);
    if (isNaN(timestamp) || Math.abs(Date.now() - timestamp) > allowedDrift) {
      return res.status(403).json({ message: 'Invalid or expired payload timestamp' });
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    if (signature !== expected) {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    next();
  };
}