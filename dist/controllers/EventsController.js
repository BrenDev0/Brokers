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
const responses_1 = require("../utils/responses");
const promise_1 = __importDefault(require("mysql2/promise"));
class EventsController {
    constructor() {
        this.pool = null;
        this.errorMessage = responses_1.errorMessage;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.pool === null) {
                    this.pool = promise_1.default.createPool({
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
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    readRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield this.pool.query("SELECT * FROM events");
                return res.status(200).json({ "data": results });
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
                const { agent } = req.body;
                if (!agent) {
                    return res.status(400).json({ "message": "All fields required." });
                }
                const [results] = yield this.pool.query("SELECT * FROM events WHERE agent = ?", [agent]);
                return res.status(200).json({ "data": results });
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
                const { eventId } = req.body;
                if (!eventId) {
                    return res.status(400).json({ "message": "All fields required." });
                }
                const [results] = yield this.pool.query("SELECT * FROM events WHERE event_id = ?", [eventId]);
                if (!results) {
                    return res.status(404).json({ "message": "Event not found." });
                }
                return res.status(200).json({ "data": results });
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
                const sqlInsert = `
                INSERT INTO events (
                    event_type,
                    event_target,
                    event_document,
                    agent
                )
                VALUES (?, ?, ?, ?)   
            `;
                const [results] = yield this.pool.query(sqlInsert, [eventType, eventTarget, eventDocument, agent]);
                if (results.affectedRows === 0) {
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
}
exports.default = EventsController;
