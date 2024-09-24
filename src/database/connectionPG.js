import { Pool } from 'pg';
require('dotenv').config();


const client = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port_db,
});

client.connect()
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch(err => console.error("Error al conectar a la base de datos", err));


module.exports = client;