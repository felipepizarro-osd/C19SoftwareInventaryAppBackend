import {conn,sql,queries} from '../database'
export const crearProveedor = async(req,res) => {
    const {nombre} = req.body
    if(nombre == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try{
        const pool = await conn()
        await pool.request()
        .input("nombre",sql.VarChar,nombre).query(queries.createProveedor)
        await res.json({nombre})
    }catch(error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const crearDetalleProveedor = async(req,res) => {
    const {nombre_prov,codigo_producto} = req.body
    if(nombre_prov == null || codigo_producto == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    console.log(req.body)
    try {
        const pool = await conn()
        await pool.request()
        .input("nombre_prov",sql.VarChar,nombre_prov)
        .input("codigo_producto",sql.VarChar,codigo_producto).query(queries.createDetalleProvedor)
        await res.json({nombre_prov,codigo_producto})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}

export const getProveedor = async (req,res) =>{
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getProveedores);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

