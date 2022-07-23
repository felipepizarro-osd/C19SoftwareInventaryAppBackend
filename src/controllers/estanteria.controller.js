import {conn,sql,queries} from '../database'
export const crearEstanteria = async(req,res) => {
    const {Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados} = req.body
    if(Bodega == null || Sku_producto == null || Modulo == null || Posicion == null || Num_Prod_Guardados == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn()
        await pool.request()
        .input('Bodega',sql.VarChar,Bodega)
        .input('Modulo',sql.VarChar,Modulo)
        .input('Posicion',sql.VarChar,Posicion)
        .input('Sku_producto',sql.VarChar,Sku_producto)
        .input('Num_Prod_Guardados',sql.Float,Num_Prod_Guardados)
        .query(queries.createEstanteria)
        await res.json({Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}
export const getModuloYPosicionByUbicacion = async (req,res)=>{
    const {bodega} = req.params;
    const pool = await conn();
    const result = await pool.request().input('bodega',sql.VarChar,bodega).query(queries.getEstanteriasByUbicacion)
    res.send(result.recordset)
}
export const getEstanteria = async (req,res) =>{
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getEstanteria);
        res.json(result.recordset)
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const crearEstanteriaX = async(req,res) => {
    const {Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados} = req.body
    console.log("crearEstanteriaX_1",req.body)
    console.log("crearEstanteriaX_1",Bodega)
    console.log("crearEstanteriaX_1",Modulo)
    console.log("crearEstanteriaX_Posicion",Posicion)
    console.log("crearEstanteriaX_Sku_producto",Sku_Producto)
    console.log("crearEstanteriaX_Num_Prod_Guardados",Num_Prod_Guardados)
    if (Bodega == null || Sku_Producto == null || Modulo == null || Posicion == null || Num_Prod_Guardados == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log("crearEstanteriaX_2",req.body)
    console.log(req.body)
    try {
        const pool = await conn()
        await pool.request()
        .input('Bodega',sql.VarChar,Bodega)
        .input('Modulo',sql.VarChar,Modulo)
        .input('Posicion',sql.VarChar,Posicion)
        .input('Sku_producto',sql.VarChar,Sku_Producto)
        .input('Num_Prod_Guardados',sql.Float,Num_Prod_Guardados)
        .query(queries.crearEstanteriaX);
        await res.json({Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}

export const deleteByCombinacion = async (req,res)=>{
    const {Bodega,Modulo,Posicion,Sku_Producto,Num_Prod_Guardados} = req.body;

    console.log("Que Ingreso al Delete",req.body);

    const pool = await conn();
    const result = await pool.request()
    .input('Bodega',sql.VarChar,Bodega)
    .input('Modulo',sql.VarChar,Modulo)
    .input('Posicion',sql.VarChar,Posicion)
    .input('Sku_producto',sql.VarChar,Sku_Producto)
    .input('Num_Prod_Guardados',sql.Float,Num_Prod_Guardados)
    .query(queries.deleteByCombinacion);
    
    //console.log(result);
    res.send(result)
}