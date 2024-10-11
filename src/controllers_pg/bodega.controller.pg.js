import { conn } from "../database/connectionPG";
import { queries_pg } from "../database/query_pg";


const getBodegas = async (req, res) => {
  let client;
  try {
    client = await conn();  // Conexión a PostgreSQL
    const result = await client.query(queries_pg.getBodegas);  // Consulta definida
    res.json(result.rows);  // Enviar las bodegas como respuesta
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send(error.message);  // Error en la consulta
    }
  } finally {
    if (client) {
      client.release();  // Liberar la conexión
    }
  }
};

const createBodega = async (req, res) => {
  const { Ubicacion } = req.body;
  
  if (!Ubicacion) {
    return res.status(400).json({ msg: 'Error de petición, ubicación es requerida' });
  }

  let client;
  try {
    client = await conn();
    const result = await client.query(queries_pg.createBodega, [Ubicacion]);
    res.status(201).json({ msg: 'Bodega creada con éxito', Ubicacion });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (client) {
      client.release();
    }
  }
};

const deleteBodega = async (req, res) => {
  const { Ubicacion } = req.body;

  if (!Ubicacion) {
    return res.status(400).json({ msg: 'Error de petición, ubicación es requerida' });
  }

  let client;
  try {
    client = await conn();
    const result = await client.query(queries_pg.deleteBodega, [Ubicacion]);
    res.json({ msg: 'Bodega eliminada con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (client) {
      client.release();
    }
  }
};

const updateBodega = async (req, res) => {
  const { Ubicacion, NuevaUbicacion } = req.body;

  if (!Ubicacion || !NuevaUbicacion) {
    return res.status(400).json({ msg: 'Error de petición, ambos campos son requeridos' });
  }

  let client;
  try {
    client = await conn();
    const result = await client.query(queries_pg.updateBodega, [NuevaUbicacion, Ubicacion]);
    res.json({ msg: 'Bodega actualizada con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (client) {
      client.release();
    }
  }
};

export { getBodegas, createBodega, deleteBodega, updateBodega };