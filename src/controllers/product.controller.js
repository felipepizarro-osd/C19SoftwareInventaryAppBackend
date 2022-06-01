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
    const {Sku,Nombre,Nombre_Servicio,Part_Number,Stock_min,Unidad} = req.body
    let {Stock} = req.body;

    if (Stock == null) Stock = 0; 

    if (Nombre == null || Sku == null || Nombre_Servicio == null || Part_Number == null || Stock_min == null || Unidad == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    console.log(req.body)
    try {
        const pool = await conn();
        await pool.request().input('Sku',sql.VarChar,Sku)
        .input('Nombre', sql.VarChar,Nombre)
        .input('Nombre_servicio',sql.VarChar,Nombre_Servicio)
        .input('Part_Number',sql.VarChar,Part_Number)
        .input('Stock',sql.Int,Stock)
        .input('Stock_min',sql.Int,Stock_min)
        .input('Unidad',sql.VarChar,Unidad).query(queries.createNewProduct);
        console.log(Sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad);
        res.json({Sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});
    } catch (error) {
        res.status(500);
        res.send(error.message);        
    }
}
export const getProductById = async (req,res)=>{
    const {Sku} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('Sku',sql.VarChar,Sku).query(queries.getProductById)
    //console.log(result);
    res.send(result)
}
export const deleteById = async (req,res)=>{
    const {Sku} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('Sku',sql.VarChar,Sku).query(queries.deleteById)
    //console.log(result);
    res.send(result)
}
export const updateProducts = async(req,res) =>{
    const {Sku} = req.params;
    const {Nombre, Nombre_Servicio, Part_Number, Stock, Stock_min, Unidad} = req.body
    if (Nombre == null || Sku == null || Nombre_Servicio == null  || Stock == null || Stock_min == null || Unidad == null){
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
    .input('Sku',sql.VarChar,Sku).query(queries.updateProducts);
    res.json({Sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad});

}
export const crearBodega = async(req,res) => {
    const {Ubicacion} = req.body
    console.log(req.body)
    if(Ubicacion == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };

    try {
        const pool = await conn()
        await pool.request().input('Ubicacion',sql.VarChar,Ubicacion).query(queries.createBodega)
        await res.json({Ubicacion})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}
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
export const crearUsuario = async(req,res) => {
    const {Rut, Nombre, Contrasena} = req.body
    if(Rut == null || Nombre == null || Contrasena == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try{
        const pool = await conn()
        await pool.request()
        .input('Rut',sql.VarChar,Rut)
        .input('Nombre',sql.VarChar,Nombre)
        .input('Contrasena',sql.VarChar,Contrasena).query(queries.createUsuario)
        await res.json({Rut, Nombre, Contrasena})
    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const getUsuario = async (req,res)=>{
    const {Rut} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('Rut',sql.VarChar,Rut).query(queries.getUsuario)
    //console.log(result);
    res.send(result)
}
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

