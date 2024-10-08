import sql from 'mssql'
import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
    database: process.env.MSSQL_DATABASE,
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    pool: {
        max: parseInt(process.env.MSSQL_POOL_MAX),
        min: parseInt(process.env.MSSQL_POOL_MIN),
        idleTimeoutMillis: parseInt(process.env.MSSQL_IDLE_TIMEOUT)
    },
    options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true', // Para Azure
        trustServerCertificate: process.env.MSSQL_TRUST_SERVER_CERTIFICATE === 'true' // Para certificados locales
    }
};
  export async function conn() {
   try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig)
    return pool;
   } catch (err) {
    console.log('err');
   }
  }
export {sql};