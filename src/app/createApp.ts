import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const createApp =  (): express.Express => {
    const app = express();

    app.use(helmet());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: "Too many requests, please try again later.",
    });

    app.use(limiter);
    app.set('trust proxy', 1);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
}

export default createApp;