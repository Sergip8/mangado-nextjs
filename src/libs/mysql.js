import mysql from "mysql2/promise";

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
export const conn = await mysql.createConnection({
    
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 3306,
        database: process.env.DB_DATABASE,
   
})