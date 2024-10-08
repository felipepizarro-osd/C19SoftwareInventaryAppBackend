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
    /**
     * @function getBodegas
     * @description Retrieves all bodegas from database
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
export const getBodegas = async (req, res) => {
    try {
        const client = await conn();
        try {
            const result = await client.query(queries_pg.getBodegas);
            res.json(result.rows);
        } finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send(error.message);
    }
}
//update bodegas
export const updateBodega = async (req, res) => {
    const { Ubicacion } = req.body;
    console.log(req.body);

    if (Ubicacion == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' });
    }

    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            console.log(queries_pg.updateBodega)
            const result = await client.query(queries_pg.updateBodega, [Ubicacion]);

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