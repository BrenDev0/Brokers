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
    // #swagger.description = 'Get all events'
    eventsController.readRequest.bind(eventsController)
);
router.get("/events/collection/:agent", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get collectiion of events by agent'
    eventsController.collectionRequest.bind(eventsController)
);
router.get("/events/resource/:id", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get event by id'
    eventsController.readRequest.bind(eventsController)
);
router.post("/events/create", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Create an event'
    eventsController.insertRequest.bind(eventsController)
);
router.delete("/events/delete/:col/:identifier", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Delete a collection of events by document or by agent, col= document or agent, identifier= identifies the doc or agent in col'
    eventsController.deleteRequest.bind(eventsController)
);
    
//listings
router.get("/listings/read", 
    // #swagger.tags = ['Listings']
    // #swagger.description = 'Get all Listings'
    listingsController.readRequest.bind(listingsController)
);
router.get("/listings/resource/:id", 
    // #swagger.tags = ['Listings']
    // #swagger.description = 'Get listing by id'
    listingsController.rescourceRequest.bind(listingsController)
);