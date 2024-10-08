import { conn } from "../database/connectionPG";
import { queries_pg } from "../database/query_pg";

export const crearEstanteria = async (req, res) => {
    const { Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados } = req.body;
    if (Bodega == null || Sku_producto == null || Modulo == null || Posicion == null || Num_Prod_Guardados == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' })
    };
    console.log(req.body)
    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            const queryText = queries_pg.createEstanteria;

            const values = [Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados];
            console.log(values);
            await client.query(queryText, values);

            res.json({Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados });
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}
export const getEstanterias = async (req, res) => {
    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            const result = await client.query(queries_pg.getAllEstanterias);
            res.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export const getModuloYPosicionByUbicacion = async (req, res) => {
    const { bodega } = req.params;
    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            const result = await client.query(queries_pg.getEstanteriasByUbicacion, [bodega]);
            res.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const crearEstanteriaX = async (req, res) => {
    const { Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados } = req.body;

    console.log("crearEstanteriaX_1", req.body);
    console.log("crearEstanteriaX_1", Bodega);
    console.log("crearEstanteriaX_1", Modulo);
    console.log("crearEstanteriaX_Posicion", Posicion);
    console.log("crearEstanteriaX_Sku_producto", Sku_Producto);
    console.log("crearEstanteriaX_Num_Prod_Guardados", Num_Prod_Guardados);

    if (Bodega == null || Sku_Producto == null || Modulo == null || Posicion == null || Num_Prod_Guardados == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' });
    }

    console.log("crearEstanteriaX_2", req.body);
    console.log(req.body);

    try {
        const client = await conn();  // Conexión a la base de datos PostgreSQL
        console.log('Connected to database');
        try {
            const queryText = queries_pg.crearEstanteriaX;  // Suponiendo que tienes la query definida en queries_pg
            const values = [Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados];

            await client.query(queryText, values);  // Ejecutando la consulta con parámetros
            res.json({ Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados });

        } finally {
            client.release();  // Asegúrate de liberar la conexión
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};
//delete by combination of modulo and posicion
export const deleteByCombinacion = async (req, res) => {
    const { Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados } = req.body;

    console.log("Ingreso al Delete", req.body);

    // Validación de los campos requeridos
    if (Bodega == null || Modulo == null || Posicion == null || Sku_Producto == null || Num_Prod_Guardados == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' });
    }

    try {
        const client = await conn();  // Conexión a la base de datos PostgreSQL
        console.log('Connected to database');
        try {
            // Definiendo la consulta para eliminar el registro
            const queryText = queries_pg.deleteByCombinacion;
            const values = [Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados];

            // Ejecutar la consulta con los parámetros
            const result = await client.query(queryText, values);
            
            console.log(result);
            res.send(result);  // Devolver el resultado de la consulta
            res.json({ Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados });

        } finally {
            client.release();  // Liberar la conexión
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);  // Manejo de errores
    }
};