import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host : process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "console",
    database: process.env.DATABASE_NAME || "form_two"
})

export default function connectDatabase(){
    return con;
}