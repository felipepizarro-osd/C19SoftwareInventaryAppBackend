import { queries_pg, sql } from "../database/query_pg";
const pool = require("../database/connectionPG");

const crearDetalleProveedor = async (req, res) => {
  const { Nombre_Prov, Codigo_Producto } = req.body;
  if (Nombre_Prov == null || Codigo_Producto == null) {
    return res.status(400).json({ msg: "Error en petición" });
  }
  console.log(req.body);
  try {
    const client = await pool.connect();
    await client
      .request()
      .input("Nombre_Prov", sql.VarChar, Nombre_Prov)
      .input("Codigo_Producto", sql.VarChar, Codigo_Producto)
      .query(queries_pg.createDetalleProvedor);
    await res.json({ Nombre_Prov, Codigo_Producto });
  } catch (error) {
    await res.status(500);
    await res.send(error.message);
  }
};

const getPyP = async (req, res) => {
  let client;
  try {
    client = await pool.connect(); 
    const result = await client.query(queries_pg.getPyP);
    res.json(result.rows); 
  } catch (error) {

    if (!res.headersSent) {
      res.status(500).send(error.message);
    }
  } finally {
    if (client) {
      client.release(); 
    }
  }
};

const deleteByCombinacionPYP = async (req, res) => {
  const { Nombre_Prov, Codigo_Producto } = req.body;

  console.log("Que Ingreso al Delete", req.body);

  const client = await pool.connect(); 
  try {
    const result = await client.query(queries_pg.deleteByCombinacionPYP, [
      Nombre_Prov,
      Codigo_Producto,
    ]); 

    res.send(result);
  } catch (error) {
    console.error("Error ejecutando la consulta", error);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release(); 
  }
};

module.exports = {
  crearDetalleProveedor,
  deleteByCombinacionPYP,
  getPyP,
};
