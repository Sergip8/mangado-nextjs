import mysql from "mysql2";
import * as fs from 'fs';
// export const conn = serverlessMysql({
//     config:{
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         port: 3306,
//         database: "mangado"
//     }
// })
// export const conn = serverlessMysql({
//     config:{
//         host: 'sql101.ezyro.com',
//         user: 'ezyro_35998756',
//         password: '0c14f2acbf7c1',
//         database: "ezyro_35998756_mangado"
//     }
// })
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_DATABASE
const pool = mysql.createPool({

        host: host,
        user: user,
        password: '$Agp860720',
        port: 3306,
        database: database,
})

export const conn = pool.promise()