import {conn,sql,queries} from '../database'
export const crearEstanteria = async(req,res) => {
    const {bodega, modulo, posicion, sku_producto, num_prod_guardados} = req.body
    if(bodega == null || sku_producto == null || modulo == null || posicion == null || num_prod_guardados == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn()
        await pool.request()
        .input('bodega',sql.VarChar,bodega)
        .input('modulo',sql.VarChar,modulo)
        .input('posicion',sql.VarChar,posicion)
        .input('sku_producto',sql.VarChar,sku_producto)
        .input('num_prod_guardados',sql.Float,num_prod_guardados)
        .query(queries.createEstanteria)
        await res.json({bodega, modulo, posicion, sku_producto, num_prod_guardados})
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