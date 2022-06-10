
export const queries = {
    getAllProduct:'SELECT * FROM producto',
    createNewProduct:'INSERT INTO producto (Sku,Nombre,Nombre_Servicio,Part_Number,Stock,Stock_min,Unidad) VALUES (@Sku,@Nombre,@Nombre_Servicio,@Part_Number,@Stock,@Stock_min,@Unidad)',
    getProductById:'SELECT * FROM producto WHERE Sku = @Sku ',
    deleteById:'delete FROM producto WHERE sku = @sku ',
    updateProducts:'update producto SET Nombre=@Nombre,Nombre_Servicio=@Nombre_Servicio,Part_Number=@Part_Number,Stock=@Stock,Stock_min=@Stock_min,Unidad=@Unidad  where Sku=@Sku',
    createBodega: 'INSERT INTO bodega (Ubicacion) VALUES (@Ubicacion)',
    createEstanteria: 'INSERT INTO estanteria (Bodega, Modulo, Posicion, Sku_producto, Num_Prod_Guardados) VALUES (@Bodega, @Modulo, @Posicion, @Sku_producto, @Num_Prod_Guardados)',
    createUsuario: 'INSERT INTO usuario (Rut, Nombre, Contrasena) VALUES (@Rut, @Nombre, @Contrasena)',
    getUsuario: 'SELECT * FROM usuario WHERE Rut = @Rut',
    createOCS: 'INSERT INTO Orden_De_Compra (Codigo,Fecha,Responsable,Entrada_Salida) VALUES (@Codigo,@Fecha,@Responsable,@Entrada_Salida)',
    createProveedor: 'INSERT INTO proveedor (Nombre) VALUES (@Nombre)',
    createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Codigo_Producto) VALUES (@Nombre_Prov,@Codigo_Producto)',
    createDetalleOC: 'INSERT INTO Detalle_OC (Codigo_OC,Codigo_Producto,Cantidad) VALUES (@Codigo_OC,@Codigo_Producto,@Cantidad)',
    getAllUsuarios: 'SELECT * FROM usuario',
    getUsuario: 'SELECT * FROM usuario WHERE rut = @rut AND contrasena = @contrasena',
    getProveedores: 'SELECT * FROM proveedor',
    getEstanteriasByUbicacion: 'SELECT estanteria.modulo,estanteria.posicion FROM estanteria WHERE bodega = @bodega'
    //createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Cod_Producto) VALUES (@Nombre_Prov,@Cod_Producto) '
}