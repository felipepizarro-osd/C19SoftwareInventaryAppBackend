export const queries = {
<<<<<<< Updated upstream
    getAllProduct:'SELECT * FROM product',
    createNewProduct:'INSERT INTO product (sku,id_categoria,name,price,stock) VALUES (@sku,@id_categoria,@name,@price,@stock)',
    getProductById:'SELECT * FROM product WHERE sku = @sku ',
    deleteById:'delete FROM product WHERE sku = @sku ',
    updateProducts:'update product SET id_categoria=@id_categoria,name=@name,price=@price,stock=@stock where sku=@sku',
    createBodega: 'INSERT INTO bodega (ubicacion) VALUES (@ubicacion)'
=======
    getAllProduct:'SELECT * FROM producto',
    getAllProductEstanteria:'SELECT Producto.Sku,Producto.Nombre,Producto.Nombre_Servicio,Producto.Part_Number,Producto.Stock,Producto.Stock_min,Producto.Unidad,Estanteria.Bodega,Estanteria.Modulo,Estanteria.Posicion FROM Producto join Estanteria on Estanteria .Sku_Producto = Producto.Sku where sku != 0',
    createNewProduct:'INSERT INTO producto (sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad) VALUES (@sku,@Nombre,@Nombre_Servicio,@Part_Number,@Stock,@Stock_min,@Unidad)',
    getProductById:'SELECT * FROM producto WHERE sku = @sku ',
    deleteById:'delete FROM producto WHERE sku = @sku ',
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
    getEstanteriasByUbicacion: 'SELECT estanteria.modulo,estanteria.posicion FROM estanteria WHERE bodega = @bodega'
    //createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Cod_Producto) VALUES (@Nombre_Prov,@Cod_Producto) '
>>>>>>> Stashed changes
}