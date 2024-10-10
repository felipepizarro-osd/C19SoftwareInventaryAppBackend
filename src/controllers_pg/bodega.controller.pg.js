const pool = require('../database/connectionPG');

//REVISAR
const crearBodega = async (req, res) => {
    const { cod_bodega, ubicacion } = req.body;
    if (!ubicacion) {
        return res.status(400).json({ msg: 'Error de petición, ubicación es requerida' });
    }
    try {
        const result = await pool.query(
            "INSERT INTO bodega (cod_bodega, ubicacion) VALUES ($1, $2) RETURNING *", 
            [cod_bodega, ubicacion]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send({ msg: 'Error interno del servidor', error: error.message });
    }
};

//CHECK
const obtenerBodegas = async (req, res) => {
    try {
        const answ = await pool.query("SELECT * FROM bodega");
        if (answ.rows.length > 0) {
            return res.json(answ.rows);
        } else {
            return res.status(404).json({ msg: 'Bodegas no encontradas' });
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Error interno' });
    }
};

//REVISAR
const eliminarBodega = async (req, res) => {
    const { cod_bodega } = req.body;
    if (!cod_bodega) {
        return res.status(400).json({ msg: 'Error de petición, codigo es requerida' });
    }
    try {
        const result = await pool.query(
            "DELETE FROM bodega WHERE cod_bodega = $1 RETURNING *", 
            [cod_bodega]
        );
        if (result.rowCount > 0) {
            return res.json(result.rows[0]);
        } else {
            return res.status(404).json({ msg: 'Bodega no encontrada' });
        }
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send({ msg: 'Error interno del servidor', error: error.message });
    }
};

const actualizarBodega = async (req, res) => {
    const { cod_bodega , ubicacion} = req.body;
    if (!cod_bodega || !ubicacion) {
        return res.status(400).json({ msg: 'Error de petición, el código de bodega y la ubicación son requeridos' });
    }
    try {
        const result = await pool.query(
            "UPDATE bodega SET ubicacion = $1 WHERE cod_bodega = $2 RETURNING *", 
            [ubicacion, cod_bodega]
        );
        if (result.rowCount > 0) {
            return res.json({ msg: 'Bodega actualizada exitosamente', bodega: result.rows[0] });
        } else {
            return res.status(404).json({ msg: 'Bodega no encontrada' });
        }
       
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send({ msg: 'Error interno del servidor', error: error.message });
    }
};


module.exports = {
    obtenerBodegas,
    crearBodega,
    eliminarBodega,
    actualizarBodega
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