import {conn,sql,queries} from '../database'

export const getProducts = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getAllProduct);
        //console.log(result);
        await res.json(result.recordset)
    } catch (error) {
        await res.status(500);
        await res.send(error.message);
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
    const {sku,id_categoria,name,price} = req.body
    let {stock} = req.body;

    if (stock == null) stock = 0; 

    if (name == null || sku == null || id_categoria == null || price == null ){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try {
        const pool = await conn();
        await pool.request().input('sku',sql.VarChar,sku)
<<<<<<< Updated upstream
        .input('id_categoria', sql.VarChar,id_categoria)
        .input('name',sql.VarChar,name)
        .input('price',sql.Float,price)
        .input('stock',sql.Int,stock).query(queries.createNewProduct);
        console.log(sku,id_categoria,name,price,stock);
        res.json({sku,id_categoria,name,price,stock});
=======
        .input('Nombre', sql.VarChar,Nombre)
        .input('Nombre_servicio',sql.VarChar,Nombre_Servicio)
        .input('Part_Number',sql.VarChar,Part_Number)
        .input('Stock',sql.Int,Stock)
        .input('Stock_min',sql.Int,Stock_min)
        .input('Unidad',sql.VarChar,Unidad).query(queries.createNewProduct);
        console.log(sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad);
        await res.json({sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});
>>>>>>> Stashed changes
    } catch (error) {
        await res.status(500);
        await res.send(error.message);        
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
        await pool.request.input('Bodega',sql.VarChar,Bodega)
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
    const {id_categoria,name,price,stock} = req.body
    if (name == null || sku == null || id_categoria == null || price == null || stock == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    const pool = await conn();
 
    await pool.request()
    .input('id_categoria', sql.VarChar,id_categoria)
    .input('name',sql.VarChar,name)
    .input('price',sql.Float,price)
    .input('stock',sql.Int,stock)
    .input('sku',sql.VarChar,sku).query(queries.updateProducts);
<<<<<<< Updated upstream
    res.json({sku,id_categoria,name,price,stock});

}
export const crearBodega = async(req,res) => {
    const {ubicacion} = req.body

    try {
        const pool = await conn()
        await pool.request().input('ubicacion',sql.VarChar,ubicacion).query(queries.createBodega)
        await res.json({ubicacion})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
=======
    res.json({sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});
 
>>>>>>> Stashed changes
}