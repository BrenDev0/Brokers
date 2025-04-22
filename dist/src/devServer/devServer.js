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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const Database_1 = __importDefault(require("../config/Database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const dbPromise = Database_1.default.getPool();
let isConnected = false;
let pool;
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isConnected) {
        pool = yield dbPromise;
        isConnected = true;
    }
    next();
}));
app.post("/database/table-info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { table } = req.body;
        const [rows] = yield pool.query(`
      SELECT 
        COLUMN_NAME AS column_name, 
        DATA_TYPE AS data_type, 
        IS_NULLABLE AS is_nullable, 
        COLUMN_DEFAULT AS column_default
      FROM 
        INFORMATION_SCHEMA.COLUMNS
      WHERE 
        TABLE_NAME = '${table}'; 
    `);
        // Respond with the table structure in JSON format
        res.status(200).json({
            success: true,
            structure: rows,
        });
    }
    catch (err) {
        console.error("Error describing table:", err);
        // Respond with an error message
        res.status(500).json({
            success: false,
            message: "Error describing the table",
            error: err,
        });
    }
}));
app.get("/database/tables", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query(`
        SHOW TABLES
    `);
        // Log the tables to the console
        console.log("Tables in the schema:", rows);
        // Respond with the list of table names in JSON format
        res.status(200).json({
            success: true,
            tables: rows,
        });
    }
    catch (err) {
        console.error("Error retrieving tables:", err);
        // Respond with an error message if the query fails
        res.status(500).json({
            success: false,
            message: "Error retrieving tables",
            error: err,
        });
    }
}));
app.post("/database/sql", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sql } = req.body;
        const [data] = yield pool.query(sql);
        // Respond with the query result in JSON format
        res.status(200).json({
            success: true,
            result: data,
        });
    }
    catch (err) {
        console.error("Error executing SQL:", err);
        // Respond with an error message if the query fails
        res.status(500).json({
            success: false,
            message: "Error executing SQL",
            error: err,
        });
    }
}));
const server = () => {
    app.listen(3000, () => {
        console.log("Online");
    });
};
server();
