import { queries_pg } from "../database/query_pg";
const pool = require('../database/connectionPG');


//REVISAR
const getOCS = async (req, res) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(queries_pg.getOrdenes);
      console.log("Entregada las ordenes");
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//REVISAR
const createOC = async (req, res) => {
  const { codigo, fecha, responsable, entrada_Salida } = req.body;
  if (!codigo || !fecha || !responsable || !entrada_Salida) {
    return res
      .status(400)
      .json({ msg: "Error de petición, informacion es requerida" });
  }
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(queries_pg.createOCS, [
        codigo,
        fecha,
        responsable,
        entrada_Salida,
      ]);
      if (result) {
        console.log("Orden creada con exito");
      } else {
        console.log("Error al crear la orden de compra");
      }
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//REVISAR
const searchOC = async (req, res) => {
  const { codigo } = req.body;
  if (!codigo) {
    return res
      .status(400)
      .json({ msg: "Error de petición, codigo es requerido" });
  }
  try {
    const client = await pool.connect();
    try {
      const result = await pool.query(queries_pg.searchOC, [codigo]);
      res.json(result.rows);
      if (result) {
        console.log("Orden creada con exito");
      } else {
        console.log("Error al crear la orden de compra");
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
