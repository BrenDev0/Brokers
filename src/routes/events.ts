import express from 'express';
import EventsController from '../controllers/EventsController';
import databaseInstance from '../config/Database';
import EventsService from '../services/EventsService';
import { eventsPool } from '../config/eventsdb';


export const initializeEventsRouter = async(customController?: EventsController) => {
    const router = express.Router();
    const controller = customController ?? await createDefaultController();

     
    router.get("/read", controller.readRequest.bind(controller));
    router.get("/collection/:agent", controller.collectionRequest.bind(controller));
    router.get("/resource/:id", controller.resourceRequest.bind(controller));
   
    
    router.post("/create", controller.insertRequest.bind(controller));
    
    router.delete("/delete/:col/:identifier", controller.deleteRequest.bind(controller));
       
    console.log("Events router initialized.")
    return router;
}

async function createDefaultController(): Promise<EventsController> {
    const pool = eventsPool;
    const controller = new EventsController(
        new EventsService(pool)
    )

    return controller;
}

