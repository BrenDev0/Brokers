"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsPool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.eventsPool = promise_1.default.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    ssl: {
        rejectUnauthorized: false,
    }
});
