export const queries_pg = {
    getAllProduct: 'SELECT * FROM producto',
    getAllProductEstanteria: `
        SELECT 
            Producto.Sku,
            Producto.Nombre,
            Producto.Nombre_Servicio,
            Producto.Part_Number,
            Producto.Stock,
            Producto.Stock_min,
            Producto.Unidad,
            Estanteria.Bodega,
            Estanteria.Modulo,
            Estanteria.Posicion 
        FROM 
            Producto 
        JOIN 
            Estanteria 
        ON 
            Estanteria.Sku_Producto = Producto.Sku 
        WHERE 
            Producto.Stock != 0`,
    createNewProduct: `
        INSERT INTO producto 
            (sku, nombre, nombre_servicio, part_number, stock, stock_min, unidad) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7)`,
    getProductById: `
        SELECT 
            Producto.Sku,
            Producto.Nombre,
            Producto.Nombre_Servicio,
            Producto.Part_Number,
            Producto.Stock,
            Producto.Stock_min,
            Producto.Unidad,
            Estanteria.Bodega,
            Estanteria.Modulo,
            Estanteria.Posicion 
        FROM 
            Producto 
        JOIN 
            Estanteria 
        ON 
            Estanteria.Sku_Producto = Producto.Sku 
        WHERE 
            Producto.Stock != 0 
        AND 
            sku = $1`,
    deleteById: 'DELETE FROM producto WHERE sku = $1',
    updateProducts: `
        UPDATE producto 
        SET 
            Nombre = $1, 
            Nombre_Servicio = $2, 
            Part_Number = $3, 
            Stock = $4, 
            Stock_min = $5, 
            Unidad = $6  
        WHERE 
            sku = $7`,
    createBodega: 'INSERT INTO bodega (Ubicacion) VALUES ($1)',
    createEstanteria: `
        INSERT INTO estanteria 
            (Bodega, Modulo, Posicion, sku_producto, Num_Prod_Guardados) 
        VALUES 
            ($1, $2, $3, $4, $5)`,
    createUsuario: `
        INSERT INTO usuario 
            (Rut, Nombre, Contrasena) 
        VALUES 
            ($1, $2, $3)`,
    createOCS: `
        INSERT INTO Orden_De_Compra 
            (Codigo, Fecha, Responsable, Entrada_Salida) 
        VALUES 
            ($1, $2, $3, $4)`,
    createProveedor: 'INSERT INTO proveedor (Nombre) VALUES ($1)',
    createDetalleProvedor: `
        INSERT INTO detalle_proveedor 
            (Nombre_Prov, Codigo_Producto) 
        VALUES 
            ($1, $2)`,
    createDetalleOC: `
        INSERT INTO Detalle_OC 
            (Codigo_OC, Codigo_Producto, Cantidad) 
        VALUES 
            ($1, $2, $3)`,
    getAllUsuarios: 'SELECT * FROM usuario',
    getUsuariosByRut: 'SELECT * FROM usuario WHERE rut = $1',
    getProveedores: 'SELECT * FROM proveedor',
    getEstanteriasByUbicacion: 'SELECT estanteria.modulo, estanteria.posicion FROM estanteria WHERE bodega = $1',
    getUsuariosByRutContrasena: 'SELECT * FROM usuario WHERE rut = $1 AND contrasena = $2',
    getBodegaByName: 'SELECT * FROM Bodega WHERE UPPER(Ubicacion) = UPPER($1)',
    getProveedorByName: 'SELECT * FROM proveedor WHERE UPPER(Nombre) = UPPER($1)',
    getEstanteria: `
        SELECT 
            Posicion 
        FROM 
            Estanteria 
        WHERE 
            Estanteria.Modulo = $1 
        AND 
            Estanteria.Posicion = $2 
        AND 
            Estanteria.Bodega = $3`,
    deleteEstanteria: 'DELETE FROM Estanteria WHERE Sku_Producto = $1',
    getOC: `
        SELECT * 
        FROM 
            Orden_de_compra 
        JOIN 
            Detalle_OC  
        ON 
            Orden_de_compra.Codigo = Detalle_OC.Codigo_OC 
        JOIN 
            Producto 
        ON 
            Producto.Sku = Detalle_OC.Codigo_Producto`,
    getOrdenes: 'SELECT * FROM Orden_de_compra',
    getPOC: `
        SELECT 
            Producto.Sku,
            Producto.Nombre,
            Producto.Nombre_Servicio,
            Producto.Part_Number,
            Producto.Stock,
            Producto.Stock_min,
            Producto.Unidad,
            Estanteria.Bodega,
            Estanteria.Modulo,
            Estanteria.Posicion 
        FROM 
            Detalle_OC 
        JOIN 
            Producto 
        ON 
            Producto.Sku = Detalle_OC.Codigo_Producto  
        JOIN 
            Estanteria 
        ON 
            Estanteria.Sku_Producto = Producto.Sku 
        WHERE 
            Detalle_OC.Codigo_OC = $1`,
    updateStock: 'UPDATE Producto SET Stock = $1 WHERE Producto.Sku = $2',
    getBodegas: 'SELECT * FROM Bodega',
    crearEstanteriaX: `
        INSERT INTO Estanteria 
            (Bodega, Modulo, Posicion, Sku_Producto, Num_Prod_Guardados) 
        VALUES 
            ($1, $2, $3, $4, $5)`,
    getEstanteria: 'SELECT * FROM Estanteria',
    getPyP: 'SELECT * FROM Detalle_Proveedor',
    deleteByCombinacionPYP: `
        DELETE FROM Detalle_Proveedor 
        WHERE 
            Nombre_Prov = $1 
        AND 
            Codigo_Producto = $2`,
    deleteByCombinacion: `
        DELETE FROM Estanteria 
        WHERE 
            Bodega = $1 
        AND 
            Modulo = $2 
        AND 
            Posicion = $3 
        AND 
            Sku_Producto = $4 
        AND 
            Num_Prod_Guardados = $5`
}