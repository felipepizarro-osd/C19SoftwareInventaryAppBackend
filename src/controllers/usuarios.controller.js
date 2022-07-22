import {conn,sql,queries} from '../database'
export const crearUsuario = async(req,res) => {
    const {rut, nombre, contrasena} = req.body
    if(rut == null || nombre == null || contrasena == null || contrasena == "" || rut == "" || nombre == ""){
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
export const getUsuariobyRutPassword  = async (request,response)=>{
    const {rut,contrasena} = request.body;
    if(rut == null || contrasena == null){
        return response.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try{
        if (rut && contrasena) {
            const pool = await conn();
            const result = await pool.request().input('rut',sql.VarChar,rut).input('contrasena',sql.VarChar,contrasena).query(queries.getUsuariosByRutContrasena)
                if (result.recordset.length > 0) {
                    response.send(result.recordset[0].Nombre);

                } else {
                    response.send('Incorrect rut and/or Password!');
                }			
                response.end();
            
        } else {
            response.send('Please enter rut and Password!');
            response.end();
        }
    }catch (error){
        await response.status(500)
        await response.send(error.message)
    }
}