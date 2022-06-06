
export const queries = {
    getAllProduct:'SELECT * FROM producto',
    createNewProduct:'INSERT INTO producto (sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad) VALUES (@sku,@nombre,@nombre_servicio,@part_number,@stock,@stock_min,@unidad)',
    getProductById:'SELECT * FROM producto WHERE sku = @sku ',
    deleteById:'delete FROM producto WHERE sku = @sku ',
    updateProducts:'update producto SET nombre=@nombre,nombre_servicio=@nombre_servicio,part_number=@part_number,stock=@stock,stock_min=@stock_min,unidad=@unidad  where sku=@sku',
    createBodega: 'INSERT INTO bodega (ubicacion) VALUES (@ubicacion)',
    createEstanteria: 'INSERT INTO estanteria (bodega, modulo, posicion, sku_producto, num_prod_guardados) VALUES (@bodega, @modulo, @posicion, @sku_producto, @num_prod_guardados)',
    createUsuario: 'INSERT INTO usuario (rut, nombre, contrasena) VALUES (@rut, @nombre, @contrasena)',
    createOCS: 'INSERT INTO Orden_De_Compra (codigo,fecha,responsable,entrada_salida) VALUES (@codigo,@fecha,@responsable,@entrada_salida)',
    createProveedor: 'INSERT INTO proveedor (nombre) VALUES (@nombre)',
    createDetalleProvedor: 'INSERT INTO detalle_proveedor (nombre_prov,codigo_producto) VALUES (@nombre_prov,@codigo_producto)',
    createDetalleOC: 'INSERT INTO Detalle_OC (codigo_oc,codigo_producto,cantidad) VALUES (@codigo_oc,@codigo_producto,@cantidad)',
    getAllUsuarios: 'SELECT * FROM usuario',
    getUsuariosByRut: 'SELECT * FROM usuario WHERE rut = @rut ',
    getProveedores: 'SELECT * FROM proveedor',
    getEstanteriasByUbicacion: 'SELECT estanteria.modulo,estanteria.posicion FROM estanteria WHERE bodega = @bodega'
    //createDetalleProvedor: 'INSERT INTO detalle_proveedor (Nombre_Prov,Cod_Producto) VALUES (@Nombre_Prov,@Cod_Producto) '
}