import { queries_pg } from '../database/query_pg';
import {conn, sql} from '../database';

export const crearBodega = async (req, res) => {
    const { Ubicacion } = req.body;
    console.log(req.body);

    if (Ubicacion == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' });
    }

    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            console.log(queries_pg.createBodega)
            const result = await client.query(queries_pg.createBodega, [Ubicacion]);

            res.json({ Ubicacion });
        }
        finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send(error.message);
    }
};