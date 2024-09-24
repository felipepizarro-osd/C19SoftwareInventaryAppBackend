import {queries_pg} from '../database/query_pg';
const pool = require('../database/connectionPG');

const getProveedor =async (req,res) => {
    try {
        const client = await pool.connect();
        try{
            const result = await client.query(queries_pg.getProveedores);
            console.log("Entregado los proveedores");
            res.json(result.rows);
        }
        finally {
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createProveedor = async(req,res) => {
    const {cod_proveedor , nombre_Proveedor , cod_producto } = req.body;
    if(!cod_proveedor || !nombre_Proveedor || !cod_producto){
        return res.status(400).json({ msg: 'Error de petición, informacion es requerida' });
    }
    try {
        const client = await pool.connect();
        try{
            const result = await client.query(queries_pg.createProveedor,[cod_proveedor,nombre_Proveedor,cod_producto]);
            if(result){
                console.log("Creado el Proveedor")
            } else{
                console.log("Error al crear el Proveedor")
            }
        } finally{
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const searchProveedorById = async(req,res) => {
    const {codigo_proveedor} = req.body;
    if(!codigo_proveedor){
        return res.status(400).json({ msg: 'Error de petición, codigo de proveedor es requerida' });
    }
    try {
        const client = await pool.connect();
        try{
            const result = await client.query(queries_pg.searchProveedor,[codigo_proveedor]);
            if(result){
                console.log("Se encontró el Proveedor")
            } else{
                console.log("Error al buscar el Proveedor")
            }
        } finally{
            client.release();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createProveedor,getProveedor,searchProveedorById
}