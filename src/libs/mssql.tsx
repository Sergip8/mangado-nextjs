import sql, { ConnectionPool } from "mssql";

let pool: ConnectionPool | null = null;

async function getConnection(): Promise<ConnectionPool> {
    const dbConfig = {
        server: process.env.DB_SERVER, 
        database: process.env.DB_NAME, 
        user: process.env.DB_USER, 
        password: "$Aa123456", 
        options: {
          encrypt: true, 
          trustServerCertificate: false,
        },
      };
      try {
        if (!pool) {
          pool = await sql.connect(dbConfig);
        }
        return pool;
      } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
      }
    }

    export { getConnection};
