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
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../utils/responses");
class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.errorMessage = responses_1.errorMessage;
    }
    readRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.eventsService.read();
                return res.status(200).json({ "data": events });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    collectionRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = req.params.agent;
                if (!agent) {
                    return res.status(400).json({ "message": "All fields required." });
                }
                const collection = yield this.eventsService.collection(agent);
                return res.status(200).json({ "data": collection });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    resourceRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = Number(req.params.id);
                if (!eventId) {
                    return res.status(400).json({ "message": "All fields required." });
                }
                if (isNaN(eventId)) {
                    return res.status(400).json({ "message": "Invalid id." });
                }
                const resource = yield this.eventsService.resource(eventId);
                if (!resource) {
                    return res.status(404).json({ "message": "Event not found." });
                }
                return res.status(200).json({ "data": resource });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    insertRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventType, eventTarget, eventDocument, agent } = req.body;
                if (!eventType || !eventTarget || !eventDocument || !agent) {
                    return res.status(400).json({ "message": "All fields required." });
                }
                const event = this.eventsService.mapEvent(eventType, eventTarget, eventDocument, agent);
                const eventCreated = yield this.eventsService.insert(event);
                if (!eventCreated) {
                    return res.status(500).json({ "message": "Error creating event." });
                }
                return res.status(201).json({ "message": "Event created." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    deleteRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const col = req.params.col;
                const identifier = req.params.identifier;
                const allowedCols = ["agent", "document"];
                if (!allowedCols.includes(col)) {
                    return res.status(400).json({ "message": "Invalid column." });
                }
                const formattedCol = col === "document" ? "event_document" : "agent";
                const eventDeleted = yield this.eventsService.delete(formattedCol, identifier);
                if (!eventDeleted) {
                    return res.status(404).json({ "message": "Event not found." });
                }
                return res.status(200).json({ "message": "events deleted." });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
}
exports.default = EventsController;
