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
    const {sku,id_categoria,name,price} = req.body
    let {stock} = req.body;

    if (stock == null) stock = 0; 

    if (name == null || sku == null || id_categoria == null || price == null ){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try {
        const pool = await conn();
        await pool.request().input('sku',sql.VarChar,sku)
        .input('id_categoria', sql.VarChar,id_categoria)
        .input('name',sql.VarChar,name)
        .input('price',sql.Float,price)
        .input('stock',sql.Int,stock).query(queries.createNewProduct);
        console.log(sku,id_categoria,name,price,stock);
        res.json({sku,id_categoria,name,price,stock});
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
}