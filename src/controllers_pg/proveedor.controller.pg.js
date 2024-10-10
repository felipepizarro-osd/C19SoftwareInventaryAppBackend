import {queries_pg} from '../database/query_pg';
import { conn } from "../database/connectionPG";

export const getProveedor = async (req, res) => {
  try {
    const client = await conn();  // Obtener la conexión a PostgreSQL
    console.log("Conectado a la base de datos de PostgreSQL");

    try {
      const result = await client.query(queries_pg.getProveedores);  // Ejecutar la consulta de proveedores
      console.log("Proveedores obtenidos correctamente");
      res.json(result.rows);  // Enviar los resultados como JSON
    } finally {
      client.release();  // Liberar el cliente después de la consulta
    }
  } catch (error) {
    console.error("Error obteniendo los proveedores", error.stack);
    res.status(500).send(error.message);  // Manejo de errores
  }
};

const createProveedor = async (req, res) => {
    const { cod_proveedor, nombre_Proveedor, cod_producto } = req.body;

    if (!cod_proveedor || !nombre_Proveedor || !cod_producto) {
        return res.status(400).json({ msg: 'Error de petición, informacion es requerida' });
    }

    try {
        const client = await conn();
        try {
  
            await client.query(queries_pg.createProveedor, [cod_proveedor, nombre_Proveedor]);
            
            const result = await client.query(queries_pg.getProductById, [cod_producto]);
            if (result.rows.length === 0) {
                console.log("Producto no encontrado");
                return res.status(404).json({ msg: 'Producto no encontrado' });
            }else{
            // Segunda consulta: Insertar en la tabla detalle_proveedor
                await client.query(queries_pg.createDetalleProvedor, [cod_proveedor, cod_producto]);
                console.log("Detalle proveedor creado con éxito");
            }

            console.log("Proveedor creado con éxito");
            res.status(201).json({ msg: 'Proveedor creado con éxito' });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error al crear el proveedor", error);
        res.status(500).send(error.message);
    }
};
const searchProveedorById = async(req, res) => {
    const { codigo_proveedor } = req.query;  // Cambiar de req.body a req.query
    if(!codigo_proveedor){
        return res.status(400).json({ msg: 'Error de petición, el código de proveedor es requerido' });
    }
    try {
        const client = await conn();
        try {
            const result = await client.query(queries_pg.searchProveedor, [codigo_proveedor]);
            if(result.rows.length > 0) {
                console.log("Se encontró el proveedor");
                res.json(result.rows[0]);  // Devolver los datos del proveedor encontrado
            } else {
                console.log("Proveedor no encontrado");
                res.status(404).json({ msg: 'Proveedor no encontrado' });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    createProveedor,getProveedor,searchProveedorById
}