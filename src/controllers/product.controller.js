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
export const getProductsEstanteria = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getAllProductEstanteria);
        //console.log(result);
        await res.json(result.recordset)
    } catch (error) {
        await res.status(500);
        await res.send(error.message);
    }

};
export const createNewProduct = async (req,res)=>{
    const {sku,Nombre,Nombre_Servicio,Part_Number,Stock_min,Unidad} = req.body
    let {Stock} = req.body;

    if (Stock == null) Stock = 0; 

    if (Nombre == null || sku == null || Nombre_Servicio == null || Part_Number == null || Stock_min == null || Unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn();
        await pool.request().input('sku',sql.VarChar,sku)
        .input('Nombre', sql.VarChar,Nombre)
        .input('Nombre_servicio',sql.VarChar,Nombre_Servicio)
        .input('Part_Number',sql.VarChar,Part_Number)
        .input('Stock',sql.Int,Stock)
        .input('Stock_min',sql.Int,Stock_min)
        .input('Unidad',sql.VarChar,Unidad).query(queries.createNewProduct);
        console.log(sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad);
        res.json({sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});
    } catch (error) {
        res.status(500);
        res.send(error.message);        
    }
}
export const createNewProductBodega = async (req,res)=>{
    const {sku,Nombre,Nombre_Servicio,Part_Number,Stock_min,Unidad,Bodega,Modulo,Posicion} = req.body
    let {Stock} = req.body;
    
    if (Stock == null) Stock = 0; 

    if (Nombre == null || sku == null || Nombre_Servicio == null || Part_Number == null || Stock_min == null || Unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn();
        await pool.request().input('sku',sql.VarChar,sku)
        .input('Nombre', sql.VarChar,Nombre)
        .input('Nombre_servicio',sql.VarChar,Nombre_Servicio)
        .input('Part_Number',sql.VarChar,Part_Number)
        .input('Stock',sql.Int,Stock)
        .input('Stock_min',sql.Int,Stock_min)
        .input('Unidad',sql.VarChar,Unidad).query(queries.createNewProduct);
        await pool.request().input('Bodega',sql.VarChar,Bodega)
        .input('Modulo',sql.VarChar,Modulo)
        .input('Posicion',sql.VarChar,Posicion)
        .input('Sku_Producto',sql.VarChar,sku)
        .input('Num_Prod_Guardados',sql.Int,Stock).query(queries.createEstanteria)

        console.log(sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad);
        await res.json({sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad,Bodega,Modulo,Posicion});
    } catch (error) {
        await res.status(500);
        await res.send(error.message);        
    }
}
export const getProductById = async (req,res)=>{
    const {sku} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('sku',sql.VarChar,sku).query(queries.getProductById)
    //console.log(result);
    await res.send(result.recordset[0])
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
    const {Nombre, Nombre_Servicio, Part_Number, Stock, Stock_min, Unidad} = req.body
    if (Nombre == null || sku == null || Nombre_Servicio == null  || Stock == null || Stock_min == null || Unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    const pool = await conn();
 
    await pool.request()
    .input('Nombre',sql.VarChar,Nombre)
    .input('Nombre_Servicio', sql.VarChar,Nombre_Servicio)
    .input('Part_Number',sql.VarChar,Part_Number)
    .input('Stock',sql.Int,Stock)
    .input('Stock_min',sql.Int,Stock_min)
    .input('Unidad',sql.VarChar,Unidad)
    .input('sku',sql.VarChar,sku).query(queries.updateProducts);
    res.json({sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});

}