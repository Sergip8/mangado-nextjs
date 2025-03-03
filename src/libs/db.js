import sql from "mssql";

async function getConnection() {
    try {
      const pool = await sql.connect(dbConfig);
      return pool;
    } catch (err) {
      console.error("Error al conectar a la base de datos:", err);
      throw err;
    }
  }
  
  async function executeQuery(query, params) {
    try {
      const pool = await getConnection();
      const result = await pool.request();
  
      if (params) {
        params.forEach((param) => {
          result.input(param.name, param.type, param.value);
        });
      }
  
      return await result.query(query);
    } catch (err) {
      console.error("Error al ejecutar la consulta:", err);
      throw err;
    }
  }
  
  module.exports = {
    getConnection,
    executeQuery,
  };