import {conn,sql,queries} from '../database'
export const crearOrdenDeCompra = async(req,res) => {
    const {Codigo,Fecha,Responsable,Entrada_Salida} = req.body
    if(Codigo == null || Fecha == null || Responsable == null || Entrada_Salida == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    if(Entrada_Salida != "Entrada" && Entrada_Salida != "Salida"){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try{
        const pool = await conn()
        await pool.request()
        .input("Codigo", sql.VarChar,Codigo)
        .input("Fecha",sql.Date,Fecha)
        .input("Responsable",sql.VarChar,Responsable)
        .input("Entrada_Salida",sql.VarChar,Entrada_Salida).query(queries.createOCS)
        await res.json({Codigo,Fecha,Responsable,Entrada_Salida})

    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const crearDetalleOC = async(req,res) => {
    const {Codigo_OC,Codigo_Producto,Cantidad} = req.body
    if(Codigo_OC == null || Codigo_Producto == null || Cantidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    }
    try {
        const pool = await conn()
        await pool.request()
        .input("Codigo_OC",sql.VarChar,Codigo_OC)
        .input("Codigo_Producto",sql.VarChar,Codigo_Producto)
        .input("Cantidad",sql.Float,Cantidad).query(queries.createDetalleOC)
        await res.json({Codigo_OC,Codigo_Producto,Cantidad})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}
export const getOrdenes = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getOrdenes);
        //console.log(result);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const getProduct = async (req,res)=>{
    const {Codigo} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('Codigo',sql.VarChar,Codigo).query(queries.getPOC)
    console.log(result);
    await res.send(result.recordset)
}

//