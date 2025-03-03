import mysql from "mysql2";
import * as fs from 'fs';

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_DATABASE
const pool = mysql.createPool({

        host: host,
        user: user,
        password: password,
        port: 3306,
        database: database,
})

export const conn = pool.promise()