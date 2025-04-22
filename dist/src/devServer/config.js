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
exports.config = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection("mysql://root:NZBlrbPTpdGPCKEFXEgZOwrvtAOvzHDA@maglev.proxy.rlwy.net:48602/railway");
        console.log("Connected to MySQL!");
        const eventsTable = `
            CREATE TABLE IF NOT EXISTS events (
                event_id INT AUTO_INCREMENT PRIMARY KEY,
                event_type VARCHAR(255) NOT NULL,
                agent VARCHAR(255) NOT NULL,
                event_target VARCHAR(255) NOT NULL,
                event_document VARCHAR(255) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

        `;
        // Example query
        const [rows] = yield connection.execute(eventsTable);
        console.log("Query result:", rows);
        yield connection.end(); // Close connection
    }
    catch (error) {
        console.error("Error connecting to MySQL:", error);
    }
});
exports.config = config;
