export const queries = {
    getAllProduct:'SELECT * FROM producto',
    getAllProductEstanteria:'SELECT Producto.Sku,Producto.Nombre,Producto.Nombre_Servicio,Producto.Part_Number,Producto.Stock,Producto.Stock_min,Producto.Unidad,Estanteria.Bodega,Estanteria.Modulo,Estanteria.Posicion FROM Producto join Estanteria on Estanteria.Sku_Producto = Producto.Sku where Producto.Stock != 0',
    createNewProduct:'INSERT INTO producto (sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad) VALUES (@sku,@Nombre,@Nombre_Servicio,@Part_Number,@Stock,@Stock_min,@Unidad)',
    getProductById:'SELECT Producto.Sku,Producto.Nombre,Producto.Nombre_Servicio,Producto.Part_Number,Producto.Stock,Producto.Stock_min,Producto.Unidad,Estanteria.Bodega,Estanteria.Modulo,Estanteria.Posicion FROM Producto join Estanteria on Estanteria .Sku_Producto = Producto.Sku where Producto.Stock != 0 and sku = @sku',
    deleteById:'delete FROM producto WHERE sku = @sku',
    updateProducts:'update producto SET Nombre=@Nombre,Nombre_Servicio=@Nombre_Servicio,Part_Number=@Part_Number,Stock=@Stock,Stock_min=@Stock_min,Unidad=@Unidad  where sku=@sku',
    createBodega: 'INSERT INTO bodega (Ubicacion) VALUES (@Ubicacion)',
    createEstanteria: 'INSERT INTO estanteria (Bodega, Modulo, Posicion, sku_producto, Num_Prod_Guardados) VALUES (@Bodega, @Modulo, @Posicion, @sku_producto, @Num_Prod_Guardados)',
    createUsuario: 'INSERT INTO usuario (Rut, Nombre, Contrasena) VALUES (@Rut, @Nombre, @Contrasena)',
    createOCS: 'INSERT INTO Orden_De_Compra (Codigo,Fecha,Responsable,Entrada_Salida) VALUES (@Codigo,@Fecha,@Responsable,@Entrada_Salida)',
    createProveedor: 'INSERT INTO proveedor (Nombre) VALUES (@Nombre)',
    createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Codigo_Producto) VALUES (@Nombre_Prov,@Codigo_Producto)',
    createDetalleOC: 'INSERT INTO Detalle_OC (Codigo_OC,Codigo_Producto,Cantidad) VALUES (@Codigo_OC,@Codigo_Producto,@Cantidad)',
    getAllUsuarios: 'SELECT * FROM usuario',
    getUsuariosByRut: 'SELECT * FROM usuario WHERE rut = @rut ',
    getProveedores: 'SELECT * FROM proveedor',
    getEstanteriasByUbicacion: 'SELECT estanteria.modulo,estanteria.posicion FROM estanteria WHERE bodega = @bodega',
    getUsuariosByRutContrasena: 'SELECT * FROM usuario WHERE rut = @rut AND contrasena=@contrasena',
    getBodegaByName:'SELECT * FROM Bodega WHERE UPPER(Ubicacion) = UPPER(@Ubicacion)',
    getProveedorByName:'SELECT * FROM proveedor WHERE UPPER(Nombre) = UPPER(@Nombre)',
    //createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Cod_Producto) VALUES (@Nombre_Prov,@Cod_Producto) '
    getEstanteria:'SELECT Posicion from Estanteria where Estanteria.Modulo = @Modulo and Estanteria.Posicion = @Posicion and Estanteria.Bodega = @Bodega',
    deleteEstanteria:'delete from Estanteria where Sku_Producto = @sku',
<<<<<<< HEAD
    getOC:'select * from Orden_de_compra join Detalle_OC  ON Orden_de_compra.Codigo = Detalle_OC.Codigo_OC JOIN Producto on Producto.Sku = Detalle_OC.Codigo_Producto',
    getOrdenes:'select * from Orden_de_compra',
    getPOC:'select Producto.Sku,Producto.Nombre,Producto.Nombre_Servicio,Producto.Part_Number,Producto.Stock,Producto.Stock_min,Producto.Unidad,Estanteria.Bodega,Estanteria.Modulo,Estanteria.Posicion from Detalle_OC join Producto on Producto.Sku = Detalle_OC.Codigo_Producto  join Estanteria on Estanteria.Sku_Producto = Producto.Sku where Detalle_OC.Codigo_OC = @Codigo',
    updateStock:'UPDATE Producto SET Stock = @Stock WHERE Producto.Sku = @sku'
=======
    getBodegas:'SELECT * FROM Bodega',
    crearEstanteriaX:'INSERT INTO Estanteria (Bodega,Modulo,Posicion,Sku_Producto,Num_Prod_Guardados) VALUES (@Bodega,@Modulo,@Posicion,@Sku_Producto,@Num_Prod_Guardados)',
    getEstanteria:'SELECT * FROM Estanteria',
    getPyP:'SELECT * FROM Detalle_Proveedor',
    deleteByCombinacionPYP:'delete from Detalle_Proveedor where(Nombre_Prov=@Nombre_Prov) AND (Codigo_Producto=@Codigo_Producto)',
    deleteByCombinacion:'delete from Estanteria where(Bodega=@Bodega) AND (Modulo=@Modulo) AND (Posicion=@Posicion)AND (Sku_Producto=@Sku_Producto) AND (Num_Prod_Guardados=@Num_Prod_Guardados)'
>>>>>>> origin/FelipeCortesC
    
} 