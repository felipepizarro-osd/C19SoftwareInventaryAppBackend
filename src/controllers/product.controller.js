import {conn,sql,queries} from '../database'
export const getProducts = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getAllProduct);
        //console.log(result);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const createNewProduct = async (req,res)=>{
    const {sku,nombre,nombre_servicio,part_number,stock_min,unidad} = req.body
    let {stock} = req.body;

    if (stock == null) stock = 0; 

    if (nombre == null || sku == null || nombre_servicio == null || part_number == null || stock_min == null || unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn();
        await pool.request().input('sku',sql.VarChar,sku)
        .input('nombre', sql.VarChar,nombre)
        .input('nombre_servicio',sql.VarChar,nombre_Servicio)
        .input('part_number',sql.VarChar,part_number)
        .input('stock',sql.Int,stock)
        .input('stock_min',sql.Int,stock_min)
        .input('unidad',sql.VarChar,unidad).query(queries.createNewProduct);
        console.log(sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad);
        res.json({sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad});
    } catch (error) {
        res.status(500);
        res.send(error.message);        
    }
}
export const getProductById = async (req,res)=>{
    const {sku} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('sku',sql.VarChar,sku).query(queries.getProductById)
    //console.log(result);
    res.send(result)
}
export const deleteById = async (req,res)=>{
    const {sku} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('sku',sql.VarChar,sku).query(queries.deleteById)
    //console.log(result);
    res.send(result)
}
export const updateProducts = async(req,res) =>{
    const {sku} = req.params;
    const {nombre, nombre_servicio, part_number, stock, stock_min, unidad} = req.body
    if (nombre == null || sku == null || nombre_servicio == null  || stock == null || stock_min == null || unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    const pool = await conn();
 
    await pool.request()
    .input('nombre',sql.VarChar,nombre)
    .input('nombre_servicio', sql.VarChar,nombre_servicio)
    .input('part_number',sql.VarChar,part_number)
    .input('stock',sql.Int,stock)
    .input('stock_min',sql.Int,stock_min)
    .input('unidad',sql.VarChar,unidad)
    .input('sku',sql.VarChar,sku).query(queries.updateProducts);
    res.json({sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad});

}