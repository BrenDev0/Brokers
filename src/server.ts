import express from 'express';
import listingsRouter from './routes/listings';
import eventsRouter from './routes/events';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/listings", listingsRouter);
app.use("/events", eventsRouter);

const server = () => {
    app.listen(3000, () =>{
        console.log("Online");
    })
}

server();