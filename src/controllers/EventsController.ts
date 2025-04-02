import { Request, Response } from 'express' 
import { errorMessage } from '../utils/responses';
import mysql from 'mysql2/promise';

class EventsController {
    private pool: any;
    private errorMessage: string
    
    constructor() {
        this.pool = null;
        this.errorMessage = errorMessage;
    }

    async init() {
        try {
            if(this.pool === null) {
                this.pool = mysql.createPool({
                    host: process.env.MYSQLHOST,
                    user: process.env.MYSQLUSER,
                    password: process.env.MYSQLPASSWORD,
                    database: process.env.MYSQL_DATABASE,
                    port: 3306,
                    ssl: {
                    rejectUnauthorized: false,
                    }
                });
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async readRequest(req: Request, res: Response): Promise<any> {
        try {
            const [results] = await this.pool.query("SELECT * FROM events");

            return res.status(200).json({"data": results})
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
    }
    
    async collectionRequest(req: Request, res: Response): Promise<any>{
        try {
            const { agentId } = req.body;

            if(!agentId) {
                return res.status(400).json({"message": "All fields required."})
            }

            const [results] = await this.pool.query("SELECT * FROM events WHERE agent = ?", [agentId]);

            return res.status(200).json({"data": results});
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
    }

    async resourceRequest(req: Request, res: Response): Promise<any> {
        try {
            const { eventId } = req.body;

            if(!eventId) {
                return res.status(400).json({"message": "All fields required."})
            }

            const [results] = await this.pool.query("SELECT * FROM events WHERE event_id = ?", [eventId]);

            if(!results) {
                return res.status(404).json({"message": "Event not found."})
            }

            return res.status(200).json({"data": results});
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }

    async insertRequest(req: Request, res: Response): Promise<any> {
        try {
            const { eventType, eventTarget, eventDocument, agent } = req.body;

            const sqlInsert = `
                INSERT INTO events (
                    event_type,
                    event_target,
                    event_document,
                    agent
                )
                VALUES (?, ?, ?, ?)   
            `

            const [results] = await this.pool.query(sqlInsert, [ eventType, eventTarget, eventDocument, agent]);

            if(results.affectedRows === 0) {
                return res.status(500).json({"message": "Error creating event."})
            }

            return res.status(201).json({"message": "Event created."})
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }
}

export default EventsController;