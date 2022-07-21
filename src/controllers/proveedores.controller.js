import {conn,sql,queries} from '../database'
export const crearProveedor = async(req,res) => {
    const {Nombre} = req.body
    if(Nombre == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try{
        const pool = await conn()
        await pool.request()
        .input("Nombre",sql.VarChar,Nombre).query(queries.createProveedor)
        await res.json({Nombre})
    }catch(error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const crearDetalleProveedor = async(req,res) => {
    const {Nombre_Prov,Codigo_Producto} = req.body
    if(Nombre_Prov == null || Codigo_Producto == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    console.log(req.body)
    try {
        const pool = await conn()
        await pool.request()
        .input("Nombre_Prov",sql.VarChar,Nombre_Prov)
        .input("Codigo_Producto",sql.VarChar,Codigo_Producto).query(queries.createDetalleProvedor)
        await res.json({Nombre_Prov,Codigo_Producto})
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

export const getProveedorByName = async (req,res)=>{
    let nombre = req.params.nombre;
    try {
        const pool = await conn();
        const result = await pool.request()
        .input('Nombre',sql.VarChar,nombre)
        .query(queries.getProveedorByName);
        
        console.log(result.recordset);
        if (result.recordset.length == 0)
        {
            await pool.request()
            .input('Nombre',sql.VarChar,nombre).query(queries.createProveedor);
            console.log("Guardado");            
        }

        res.json(result.recordset[0])
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
