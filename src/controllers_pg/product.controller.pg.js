import {conn, queries_pg, sql} from '../database';
import {queries_pg_, queries_pgpg} from '../database/query_pg';
export const getProductsEstanteria = async (req,res)=> {
    console.log('entro a getProductsEstanteria');
    try {
        const client = await conn();
        try{
            const result = await client.query(queries_pg_pg.getAllProductEstanteria);
            res.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export const getProducts = async (req,res)=> {
    console.log('entro a getProducts');
    try {
        const client = await conn();
        try{
            const result = await client.query(queries_pg_pg.getAllProduct);
            res.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
//TODO: Implementar nuevas reglas de negocio

export const createNewProduct = async (req, res) => {
    const { sku, nombre, nombre_servicio, part_number, stock_min, unidad } = req.body;
    let { stock } = req.body;

    if (stock == null) stock = 0;

    if (nombre == null || sku == null || nombre_servicio == null || part_number == null || stock_min == null || unidad == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all Fields' });
    }

    console.log(req.body);

    try {
        const client = await conn();
        console.log('Connected to database');
        try {
            // Obtener columnas de la tabla "producto"
            const columnQuery = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'producto';
            `;
            const columnResult = await client.query(columnQuery);
            console.log('Columnas de la tabla "producto":', columnResult.rows);

            const queryText = queries_pg_pg.createNewProduct; // Asegúrate de que la consulta esté definida correctamente
            console.log(queryText);
            const values = [sku, nombre, nombre_servicio, part_number, stock, stock_min, unidad];
            console.log(values);
            await client.query(queryText, values);

            console.log(sku, nombre, nombre_servicio, part_number, stock, stock_min, unidad);
            res.json({sku, nombre, nombre_servicio, part_number, stock, stock_min, unidad });
        } finally {
            client.release(); // Libera el cliente de vuelta al pool
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const createNewProductOrder = async (req, res) => {
    const { codigo } = req.params;
    const { Sku, Nombre, Nombre_Servicio, Part_Number, Stock_min, Unidad, Bodega, Modulo, Posicion } = req.body;
    let { Stock } = req.body;
    let { Cantidad } = req.body;

    if (Stock == null) Stock = 0;

    // Validación de datos requeridos
    if (Nombre == null || Sku == null || Nombre_Servicio == null || Part_Number == null || Stock_min == null || Unidad == null) {
        return res.status(400).send({ message: 'Por favor ingrese todos los datos' });
    }

    console.log(req.body);
    console.log(req.params);

    try {
        const client = await conn();  // Establece la conexión a la base de datos PostgreSQL
        if (!client) return res.status(500).send({ message: 'Error de conexión' });
        else {
            console.log('Conectado a la base de datos');
        }
        // Verificar si el producto ya existe
        const result1 = await client.query(queries_pg.getProductById, [Sku]);
        console.log("consulting the product",result1);
        let Stock_nuevo = Stock + parseInt(Cantidad);
        let Cant = parseInt(Cantidad);
        console.log('result1 get product by id',result1.rows);

        if (result1.rows.length !== 0) {
            try {
                // Actualizar el stock del producto existente
                await client.query(queries_pg.updateStock, [Stock_nuevo, Sku]);

                // Insertar detalle de la orden de compra
                await client.query(queries_pg.createDetalleOC, [codigo, Sku, Cant]);
            } catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Error al actualizar el producto o crear detalle OC' });
            }
        } else {
            // Verificar si la estantería (Bodega, Módulo, Posición) existe
            const result = await client.query(queries_pg.getEstanteria, [Bodega, Modulo, Posicion]);
            console.log(Posicion);
            console.log(result.rows.length);

            if (result.rows.length !== 0) {
                console.log(`La posición es correcta: ${Posicion}`);

                try {
                    // Crear nuevo producto
                    await client.query(queries_pg.createNewProduct, [Sku, Nombre, Nombre_Servicio, Part_Number, Stock_nuevo, Stock_min, Unidad]);

                    // Crear estantería para el producto
                    await client.query(queries_pg.createEstanteria, [Bodega, Modulo, Posicion, Sku, Stock]);

                    console.log(Sku, Nombre, Nombre_Servicio, Part_Number, Stock, Stock_min, Unidad);

                    // Insertar detalle de la orden de compra
                    await client.query(queries_pg.createDetalleOC, [codigo, Sku, Cant]);

                    res.json({ Sku, Nombre, Nombre_Servicio, Part_Number, Stock, Stock_min, Unidad, Bodega, Modulo, Posicion });
                } catch (error) {
                    console.log(error);
                    return res.status(500).send({ message: 'Error al crear el producto o estantería' });
                }
            } else {
                return res.status(400).send({ message: 'Posición inválida' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Lo sentimos, la posición está ocupada o hubo un error de conexión' });
    }
};