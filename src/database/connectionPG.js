import { Pool } from 'pg';
const conf = require("dotenv").config();

const sqlConfig = {
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port_db, 
    max: 10, // Número máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión ociosa
    connectionTimeoutMillis: 2000, // Tiempo de espera para establecer una nueva conexión
};

export async function conn() {
    const pool = new Pool(sqlConfig);
    try {
        const client = await pool.connect();
        if(client){
            console.log("Conexion establecida correctamente");
        }
        return client;
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}

export { Pool };