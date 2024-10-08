import { Pool } from 'pg';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const sqlConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT, // Puerto de PostgreSQL
    max: 10, // Número máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión ociosa
    connectionTimeoutMillis: 2000, // Tiempo de espera para establecer una nueva conexión
};
export async function conn() {
    const pool = new Pool(sqlConfig);
    try {
        const client = await pool.connect();
        return client;
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}

export { Pool };