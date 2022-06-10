import {conn,sql,queries} from '../database'
export const crearUsuario = async(req,res) => {
    const {rut, Nombre, contrasena} = req.body
    if(rut == null || Nombre == null || contrasena == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try{
        const pool = await conn()
        await pool.request()
        .input('Rut',sql.VarChar,rut)
        .input('Nombre',sql.VarChar,Nombre)
        .input('Contrasena',sql.VarChar,contrasena).query(queries.createUsuario)
        await res.json({rut, Nombre, contrasena})
    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const getUsuarios = async (req,res)=> {
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
export const getUsuario  = async (req,res)=>{
    const {rut,contrasena} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('rut',sql.VarChar,rut).input('contrasena',sql.VarChar,contrasena).query(queries.getUsuario)
    //console.log(result);
    await res.send(result.recordset[0])
}