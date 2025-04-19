import listingsRouter from './routes/listings';
import { isinitializeEventsRouter } from './routes/events';
import createApp from './app/createApp';


const server = async() => {
    const app = createApp();

    const [
        eventsRouter
    ] = await Promise.all([
        isinitializeEventsRouter()
    ])

    app.use("/listings", listingsRouter);
    app.use("/events", eventsRouter);

    app.listen(3000, () => {
        console.log("Online");
    })
}

server();