import sql, { ConnectionPool } from "mssql";

let pool: ConnectionPool | null = null;
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || "", 
  database: process.env.DB_NAME, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  options: {
    encrypt: true, 
    trustServerCertificate: false,
  },
}


async function getConnection(): Promise<sql.ConnectionPool> {
      try {
          const pool = await sql.connect(dbConfig);
          console.log('Conexión a MSSQL establecida correctamente.');
          return pool;
      } catch (error) {
          console.error('Error al conectar a MSSQL:', error);
          throw error;
      }
  }
  
    export { getConnection};
