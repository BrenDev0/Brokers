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
class EventsService {
    constructor(pool) {
        this.pool = pool;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.pool.query("SELECT * FROM events");
                return result;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting events.");
            }
        });
    }
    collection(agent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.pool.query("SELECT * FROM events WHERE agent = ?", [agent]);
                return result;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error getting collection.");
            }
        });
    }
    resource(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.pool.query("SELECT * FROM events WHERE event_id = ?", [eventId]);
                return result || null;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error gettign event.");
            }
        });
    }
    insert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlInsert = `
                INSERT INTO events (
                    event_type,
                    event_target,
                    event_document,
                    agent
                )
                VALUES (?, ?, ?, ?)   
            `;
                const [result] = yield this.pool.execute(sqlInsert, [
                    event.event_type,
                    event.event_target,
                    event.event_document,
                    event.agent
                ]);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error creating event.");
            }
        });
    }
    delete(col, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.pool.execute(`DELETE FROM events WHERE ${col} =  ?`, [identifier]);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error deleting event.");
            }
        });
    }
    mapEvent(eventType, eventTarget, eventDocument, agent) {
        return {
            event_type: eventType,
            event_target: eventTarget,
            event_document: eventDocument,
            agent: agent
        };
    }
}
exports.default = EventsService;
