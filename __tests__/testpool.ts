import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';


export const eventsPool = mysql.createPool({
    uri: process.env.TEST_DB_URL,
    ssl: {
    rejectUnauthorized: false,
    }
});