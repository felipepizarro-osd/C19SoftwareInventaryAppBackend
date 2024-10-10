import { queries_pg } from "../database/query_pg";
import { conn } from "../database/connectionPG";


//REVISAR
export const getOCS = async (req, res) => {
  try {
    const client = await conn(); // Obtén la conexión desde el pool
    console.log("Conexión establecida con la base de datos PostgreSQL");
    try {
      const result = await client.query(queries_pg.getOrdenes); // Ejecuta la consulta
      console.log("Entregando las órdenes");
      res.json(result.rows); // Envía los resultados en formato JSON
    } finally {
      client.release(); // Libera el cliente después de la consulta
    }
  } catch (error) {
    console.error("Error al obtener las órdenes", error.message);
    res.status(500).send(error.message); // Envía el mensaje de error
  }
};

//REVISAR
export const createOC = async (req, res) => {
  const { codigo, fecha, responsable, entrada_Salida } = req.body;

  // Validación para asegurarse de que todos los campos estén presentes
  if (!codigo || !fecha || !responsable || !entrada_Salida) {
    return res
      .status(400)
      .json({ msg: "Error de petición, información es requerida" });
  }

  try {
    const client = await conn(); // Obtén la conexión desde el pool
    console.log("Conexión establecida con la base de datos PostgreSQL");
    try {
      // Ejecuta la consulta con los valores del cuerpo de la solicitud
      const result = await client.query(queries_pg.createOCS, [
        codigo,
        fecha,
        responsable,
        entrada_Salida,
      ]);

      if (result.rowCount > 0) { // Verifica si la consulta afectó filas
        console.log("Orden creada con éxito");
        res.status(201).json({ msg: "Orden creada con éxito" });
      } else {
        console.log("Error al crear la orden de compra");
        res.status(500).json({ msg: "Error al crear la orden de compra" });
      }
    } finally {
      client.release(); // Libera la conexión después de la consulta
    }
  } catch (error) {
    console.error("Error al crear la orden de compra:", error.message);
    res.status(500).send(error.message); // Manejo de errores
  }
};

//REVISAR
const searchOC = async (req, res) => {
  const { codigo } = req.query;  // Extraer 'codigo' desde los query params
  if (!codigo) {
    return res
      .status(400)
      .json({ msg: "Error de petición, código es requerido" });
  }
  try {
    const client = await conn();
    try {
      const result = await client.query(queries_pg.BuscarOC, [codigo]);
      res.json(result.rows);
      if (result.rows.length > 0) {
        console.log("Orden encontrada");
      } else {
        console.log("No se encontró la orden");
        res.status(404).send({ msg: "No se encontró ninguna orden con ese código" });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error ejecutando la consulta", error.stack);
    res.status(500).send(error.message);
  }
};

module.exports = { getOCS, createOC, searchOC };
