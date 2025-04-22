import { Request, Response } from 'express'
import { initializeListingsRouter } from './routes/listings';
import { initializeEventsRouter } from './routes/events';
import createApp from './app/createApp';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger.json';


const server = async() => {
    const app = createApp();

    const [
        eventsRouter,
        listingsRouter
    ] = await Promise.all([
        initializeEventsRouter(),
        initializeListingsRouter()
    ])

    app.use("/listings", listingsRouter);
    app.use("/events", eventsRouter);

    process.env.NODE_ENV !== 'production' && app.use('/docs/endpoints', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    
    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found." });
    });

    app.listen(3000, () => {
        console.log("Online");
    })
}

server();