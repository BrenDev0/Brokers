import mysql from 'mysql2/promise';


export const eventsPool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    ssl: {
    rejectUnauthorized: false,
    }
});