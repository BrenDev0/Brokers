import express, { Request, Response, NextFunction } from 'express';
import EventsController from '../controllers/EventsController';
import databaseInstance from '../config/Database';
import EventsService from '../services/EventsService';
import { eventsPool } from '../config/eventsdb';


export const isinitializeEventsRouter = async(customController?: EventsController) => {
    const router = express.Router();
    const controller = customController ?? await createDefaultController();

    const handleRequest = (handler: (req: Request, res: Response) => any) => 
        (req: Request, res: Response) => {
            if (!controller) {
                return res.status(503).json({ 
                message: "Service initializing",
                retryAfter: "5s"
            });
        }
        return handler(req, res);
    };


    router.get("/read", handleRequest((req, res) => controller.readRequest(req, res)));
    router.get("/collection/:agent", handleRequest((req, res) => controller.collectionRequest(req, res)));
    router.get("/resource", handleRequest((req, res) => controller.readRequest(req, res)));
   
    router.post("/insert", handleRequest((req, res) => controller.insertRequest(req, res)));
    
    router.delete("/delete/:col/:identifier", handleRequest((req, res) => controller.deleteRequest(req, res)));  

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

