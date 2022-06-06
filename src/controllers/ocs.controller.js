import {conn,sql,queries} from '../database'
export const crearOrdenDeCompra = async(req,res) => {
    const {codigo,fecha,responsable,entrada_salida} = req.body
    if(codigo == null || fecha == null || responsable == null || entrada_salida == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    if(entrada_salida != "Entrada" && entrada_salida != "Salida"){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try{
        const pool = await conn()
        await pool.request()
        .input("codigo", sql.VarChar,codigo)
        .input("fecha",sql.Date,fecha)
        .input("responsable",sql.VarChar,responsable)
        .input("entrada_salida",sql.VarChar,entrada_salida).query(queries.createOCS)
        await res.json({codigo,fecha,responsable,entrada_salida})

    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const crearDetalleOC = async(req,res) => {
    const {codigo_OC,codigo_Producto,Cantidad} = req.body
    if(codigo_OC == null || codigo_Producto == null || Cantidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try {
        const pool = await conn()
        await pool.request()
        .input("codigo_OC",sql.VarChar,codigo_OC)
        .input("codigo_Producto",sql.VarChar,codigo_Producto)
        .input("Cantidad",sql.Float,Cantidad).query(queries.createDetalleOC)
        await res.json({codigo_OC,codigo_Producto,Cantidad})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}