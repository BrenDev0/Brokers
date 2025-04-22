"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventsController_1 = __importDefault(require("../controllers/EventsController"));
const EventsService_1 = __importDefault(require("../services/EventsService"));
const ListingsController_1 = __importDefault(require("../controllers/ListingsController"));
const ListingsService_1 = __importDefault(require("../services/ListingsService"));
const router = express_1.default.Router();
const pool = {};
const eventsController = new EventsController_1.default(new EventsService_1.default(pool));
const listingsController = new ListingsController_1.default(new ListingsService_1.default(pool));
//events
// #swagger.tags 
router.get("/events/read", 
// #swagger.tags = ['Events']
// #swagger.description = 'Get all events'
eventsController.readRequest.bind(eventsController));
router.get("/events/collection/:agent", 
// #swagger.tags = ['Events']
// #swagger.description = 'Get collectiion of events by agent'
eventsController.collectionRequest.bind(eventsController));
router.get("/events/resource/:id", 
// #swagger.tags = ['Events']
// #swagger.description = 'Get event by id'
eventsController.readRequest.bind(eventsController));
router.post("/events/create", 
// #swagger.tags = ['Events']
// #swagger.description = 'Create an event'
eventsController.insertRequest.bind(eventsController));
router.delete("/events/delete/:col/:identifier", 
// #swagger.tags = ['Events']
// #swagger.description = 'Delete a collection of events by document or by agent, col= document or agent, identifier= identifies the doc or agent in col'
eventsController.deleteRequest.bind(eventsController));
//listings
router.get("/listings/read", 
// #swagger.tags = ['Listings']
// #swagger.description = 'Get all Listings'
listingsController.readRequest.bind(listingsController));
router.get("/listings/resource/:id", 
// #swagger.tags = ['Listings']
// #swagger.description = 'Get listing by id'
listingsController.rescourceRequest.bind(listingsController));
