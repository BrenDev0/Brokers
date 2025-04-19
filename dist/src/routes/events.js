"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isinitializeEventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const EventsController_1 = __importDefault(require("../controllers/EventsController"));
const EventsService_1 = __importDefault(require("../services/EventsService"));
const eventsdb_1 = require("../config/eventsdb");
const isinitializeEventsRouter = (customController) => __awaiter(void 0, void 0, void 0, function* () {
    const router = express_1.default.Router();
    const controller = customController !== null && customController !== void 0 ? customController : yield createDefaultController();
    const handleRequest = (handler) => (req, res) => {
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
    handleRequest((req, res) => controller.readRequest(req, res)));
    router.get("/collection/:agent", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get a scollection of events by agent'
    // #swagger.parameters['agent'] = {
    //   in: 'path',
    //   description: 'agent identifier',
    //   required: true,
    //   type: 'string'
    // }
    handleRequest((req, res) => controller.collectionRequest(req, res)));
    router.get("/resource/:id", 
    // #swagger.tags = ['Events']
    // #swagger.description = 'Get a specific event by ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'The ID of the event',
    //   required: true,
    //   type: 'string'
    // }
    handleRequest((req, res) => controller.readRequest(req, res)));
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
    handleRequest((req, res) => controller.insertRequest(req, res)));
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
    handleRequest((req, res) => controller.deleteRequest(req, res)));
    console.log("Events router initialized.");
    return router;
});
exports.isinitializeEventsRouter = isinitializeEventsRouter;
function createDefaultController() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = eventsdb_1.eventsPool;
        const controller = new EventsController_1.default(new EventsService_1.default(pool));
        return controller;
    });
}
