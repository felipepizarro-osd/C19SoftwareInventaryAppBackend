import {queries_pg} from '../database/query_pg';
const pool = require('../database/connectionPG');


const crearDetalleProveedor = async(req,res) => {
    const {Nombre_Prov,Codigo_Producto} = req.body
    if(Nombre_Prov == null || Codigo_Producto == null){
        return res.status(400).json({msg:'Error en petición'})
    }
    console.log(req.body)
    try {
        const client = await pool.connect();
        await client.request()
        .input("Nombre_Prov",sql.VarChar,Nombre_Prov)
        .input("Codigo_Producto",sql.VarChar,Codigo_Producto).query(queries.createDetalleProvedor)
        await res.json({Nombre_Prov,Codigo_Producto})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}

const getPyP = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.request().query(queries.getPyP);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteByCombinacionPYP = async (req,res)=>{
    const {Nombre_Prov,Codigo_Producto} = req.body;

    console.log("Que Ingreso al Delete",req.body);

    const client = await pool.connect();
    const result = await client.request()
    .input('Nombre_Prov',sql.VarChar,Nombre_Prov)
    .input('Codigo_Producto',sql.VarChar,Codigo_Producto)
    .query(queries.deleteByCombinacionPYP);
    
    //console.log(result);
    res.send(result)
}

module.exports = {
    crearDetalleProveedor,
    deleteByCombinacionPYP,
    getPyP
}