import { Pool } from 'pg';

const sqlConfig = {
    user: 'felipepizarro',
    host: 'localhost',
    database: 'inventariodb',
    password: '198252021298',
    port: 5431, // El puerto por defecto para PostgreSQL
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