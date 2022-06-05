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