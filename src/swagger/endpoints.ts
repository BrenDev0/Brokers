import express from 'express';
import EventsController from '../controllers/EventsController';
import EventsService from '../services/EventsService';
import mysql, { Pool } from 'mysql2/promise'
import ListingsController from '../controllers/ListingsController';
import ListingsService from '../services/ListingsService';

const router = express.Router();
const pool: Pool = {} as Pool;
const eventsController = new EventsController(
    new EventsService(pool)
)

const listingsController = new ListingsController(
    new ListingsService(pool)
)



//events
// #swagger.tags 
router.get("/events/read", 
    // #swagger.tags = ['Events']
    eventsController.readRequest.bind(eventsController)
);
router.get("/events/collection/:agent", 
    // #swagger.tags = ['Events']
    eventsController.collectionRequest.bind(eventsController)
);
router.get("/events/resource/:id", 
    // #swagger.tags = ['Events']
    eventsController.readRequest.bind(eventsController)
);
router.post("/events/insert", 
    // #swagger.tags = ['Events']
    eventsController.insertRequest.bind(eventsController)
);
router.delete("/events/delete/:col/:identifier", 
    // #swagger.tags = ['Events']
    eventsController.deleteRequest.bind(eventsController)
);
    
//listings
router.get("/listings/read", 
    // #swagger.tags = ['Listings']
    listingsController.readRequest.bind(listingsController)
);
router.get("/listings/resource/:id", 
    // #swagger.tags = ['Listings']
    listingsController.rescourceRequest.bind(listingsController)
);