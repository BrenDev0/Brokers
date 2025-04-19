import mysql, { QueryResult, Pool, ResultSetHeader } from 'mysql2/promise'
import { Event } from '../interface/models';

class EventsService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async read(): Promise<QueryResult> {
        try {
            const [result] = await this.pool.query(
                "SELECT * FROM events"
            )

            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting events.")
        }
    }

    async collection(agent: string): Promise<QueryResult> {
        try {
            const [result] = await this.pool.query(
                "SELECT * FROM events WHERE agent = ?",
                [ agent ]
            )

            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting collection.")
        }
    } 
    
    async resource(eventId: number): Promise<QueryResult | null> {
        try {
            const [result] = await this.pool.query(
                "SELECT * FROM events WHERE event_id = ?",
                [ eventId ]
            )

            return result || null;
        } catch (error) {
           console.log(error);
           throw new Error("Error gettign event.") 
        }
    }

    async insert(event: Event): Promise<boolean> {
        try {
            const sqlInsert = `
                INSERT INTO events (
                    event_type,
                    event_target,
                    event_document,
                    agent
                )
                VALUES (?, ?, ?, ?)   
            `

            const [result] = await this.pool.execute<ResultSetHeader>(sqlInsert, [ 
                event.event_type, 
                event.event_target, 
                event.event_document,
                event.agent
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating event.")
        }
    }

    async delete(col: string, identifier: string): Promise<boolean> {
        try {
            const [result] = await this.pool.execute<ResultSetHeader>(
                `DELETE FROM events WHERE ${col} =  ?`,
                [ identifier]
            ) 

            return result.affectedRows > 0;

        } catch (error) {
            console.log(error);
            throw new Error("Error deleting event.")
        }
    }

    mapEvent(eventType: string, eventTarget: string, eventDocument: string, agent: string): Event {
        return {
            event_type: eventType,
            event_target: eventTarget,
            event_document: eventDocument,
            agent: agent
        }
    }
}

export default EventsService