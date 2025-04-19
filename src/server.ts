import { initializeListingsRouter } from './routes/listings';
import { initializeEventsRouter } from './routes/events';
import createApp from './app/createApp';


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

    app.listen(3000, () => {
        console.log("Online");
    })
}

server();