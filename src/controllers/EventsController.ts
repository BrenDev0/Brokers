import { Request, Response } from 'express' 
import { errorMessage } from '../utils/responses';

import EventsService from '../services/EventsService';

class EventsController {
    eventsService: EventsService;
    private errorMessage: string
    
    constructor(eventsService: EventsService) {
        this.eventsService = eventsService;

        this.errorMessage = errorMessage;
    }

    async readRequest(req: Request, res: Response): Promise<any> {
        try {
            const events = await this.eventsService.read();

            return res.status(200).json({ "data": events })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "message": this.errorMessage });
        }
    }
    
    async collectionRequest(req: Request, res: Response): Promise<any>{
        try {
            const agent  = req.params.agent;

            if(!agent) {
                return res.status(400).json({"message": "All fields required."})
            }

            const collection = await this.eventsService.collection(agent);

            return res.status(200).json({ "data": collection });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "message": this.errorMessage });
        }
    }

    async resourceRequest(req: Request, res: Response): Promise<any> {
        try {
            const eventId = Number(req.params.id);
            
            if(!eventId) {
                return res.status(400).json({"message": "All fields required."})
            }

            if(isNaN(eventId)) {
                return res.status(400).json({ "message": "Invalid id."})
            }

            const resource = await this.eventsService.resource(eventId);

            if(!resource) {
                return res.status(404).json({"message": "Event not found."})
            }

            return res.status(200).json({ "data": resource });
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }

    async insertRequest(req: Request, res: Response): Promise<any> {
        try {
            const { eventType, eventTarget, eventDocument, agent } = req.body;

           if(!eventType || !eventTarget || !eventDocument || !agent) {
            return res.status(400).json({ "message": "All fields required."})
           }
            
           const event = this.eventsService.mapEvent(eventType, eventTarget, eventDocument,agent);

            const eventCreated = await this.eventsService.insert(event);

            if(!eventCreated) {
                return res.status(500).json({"message": "Error creating event."})
            }

            return res.status(201).json({"message": "Event created."})
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }

    async deleteRequest(req: Request, res: Response): Promise<any> {
        try {
            const col = req.params.col;
            const identifier = req.params.identifier;

            const allowedCols = ["agent", "document"];
            
            if(!allowedCols.includes(col)) {
                return res.status(400).json({ "message": "Invalid column." })
            }

            const formattedCol = col === "document" ? "event_document" : "agent"
            const eventDeleted = await this.eventsService.delete(formattedCol, identifier);

            if(!eventDeleted) {
                return res.status(404).json({ "message": "Event not found." })
            }

            return res.status(200).json({ "message": "events deleted." })
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }
}

export default EventsController;