import { queries_pg, sql } from "../database/query_pg";
import { conn } from "../database/connectionPG";

const crearDetalleProveedor = async (req, res) => {
  const { cod_proveedor, cod_producto } = req.body;

  // Validar que los campos no estén vacíos
  if (!cod_proveedor || !cod_producto) {
    return res.status(400).json({ msg: "Error en la petición, campos requeridos" });
  }

  console.log(req.body);

  try {
    const client = await conn();  // Obtener el cliente
    try {
      console.log(queries_pg.createDetalleProvedor);
      // Ejecutar la query
      const result = await client.query(
        queries_pg.createDetalleProvedor, // Nombre de la query en queries_pg
        [cod_proveedor, cod_producto]      // Parámetros de la query
      );

      if (result.rowCount > 0) {
        console.log("Detalle del proveedor creado con éxito");
        res.json({ cod_proveedor, cod_producto });
      } else {
        console.log("Error al crear el detalle del proveedor");
        res.status(500).json({ msg: "Error al crear el detalle del proveedor" });
      }
    } finally {
      client.release();  // Liberar el cliente
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPyP = async (req, res) => {
  let client;
  try {
    client = await conn();  // Usamos la conexión obtenida por `conn()`
    const result = await client.query(queries_pg.getPyP);  // Ejecutamos la consulta
    res.json(result.rows);  // Devolvemos las filas obtenidas en la respuesta
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send(error.message);  // Enviamos un error 500 si ocurre un problema
    }
  } finally {
    if (client) {
      client.release();  // Liberamos el cliente
    }
  }
};

const deleteByCombinacionPYP = async (req, res) => {
  const { Nombre_Prov, Codigo_Producto } = req.body;

  console.log("Que Ingreso al Delete", req.body);

  let client;
  try {
    client = await conn();  // Usamos la conexión obtenida por `conn()`
    const result = await client.query(queries_pg.deleteByCombinacionPYP, [
      Nombre_Prov,
      Codigo_Producto,
    ]);  // Ejecutamos la consulta con los parámetros

    res.send(result);
    if (result.rowCount > 0) {
      console.log("Detalle de proveedor eliminado con éxito");
    };
      // Devolvemos el resultado
  } catch (error) {
    console.error("Error ejecutando la consulta", error);
    res.status(500).send("Error en el servidor");  // Enviamos un error 500 si ocurre un problema
  } finally {
    if (client) {
      client.release();  // Liberamos el cliente
    }
  }
};

module.exports = {
  crearDetalleProveedor,
  deleteByCombinacionPYP,
  getPyP,
};
