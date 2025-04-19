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

     
    router.get("/read",
        // #swagger.tags = ['Events']
        // #swagger.description = 'Get all events'
        handleRequest((req, res) => controller.readRequest(req, res))
    );
    

    router.get("/collection/:agent",
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get a scollection of events by agent'
    // #swagger.parameters['agent'] = {
    //   in: 'path',
    //   description: 'agent identifier',
    //   required: true,
    //   type: 'string'
    // }
        handleRequest((req, res) => controller.collectionRequest(req, res))
    );
    
    
    router.get("/resource/:id", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get a specific event by ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'The ID of the event',
    //   required: true,
    //   type: 'string'
    // }
        handleRequest((req, res) => controller.readRequest(req, res))
    );
   
    
    router.post("/insert",
    // #swagger.tags = ['Events']
    // #swagger.description = 'Insert event to db'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            eventType: { type: "string", example: "click" },
                            eventTarget: { type: "string", example: "more info button" },
                            eventDocument: { type: "string", example: "home page" },
                            agent: { type: "string", example: "agent1234" }
                        },
                        required: ["eventType", "eventTarget", "eventDocument", "agent"]
                    }  
                }
            }
        } 
    */
        handleRequest((req, res) => controller.insertRequest(req, res))
    );
    
    
    router.delete("/delete/:col/:identifier", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Delete events by agent or document'
    // #swagger.parameters['col'] = {
    //   in: 'path',
    //   description: 'filter, can be agent or document',
    //   required: true,
    //   type: 'string'
    // },
    // #swagger.parameters['identifier'] = {
    //   in: 'path',
    //   description: 'identifier for the filter',
    //   required: true,
    //   type: 'string'
    // }
        handleRequest((req, res) => controller.deleteRequest(req, res))
    );
       

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

