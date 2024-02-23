import serverlessMysql  from "serverless-mysql";

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
export const conn = serverlessMysql({
    config:{
        host: 'mangado.caampijxkitk.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: '86072052228',
        port: 3306,
        database: "mangado"
    }
})