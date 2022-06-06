import {conn,sql,queries} from '../database'
export const crearUsuario = async(req,res) => {
    const {rut, nombre, contrasena} = req.body
    if(rut == null || nombre == null || contrasena == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try{
        const pool = await conn()
        await pool.request()
        .input('rut',sql.VarChar,rut)
        .input('nombre',sql.VarChar,nombre)
        .input('contrasena',sql.VarChar,contrasena).query(queries.createUsuario)
        await res.json({rut, nombre, contrasena})
    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const getUsuario = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getAllUsuarios);
        //console.log(result);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const getUsuariobyRUT  = async (req,res)=>{
    const {rut} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('rut',sql.VarChar,rut).query(queries.getUsuariosByRut)
    //console.log(result);
    res.send(result.recordset)
}