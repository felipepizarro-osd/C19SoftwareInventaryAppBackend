CREATE TABLE Orden_de_compra (
    Codigo VARCHAR(255) NOT NULL,
    Fecha DATE NOT NULL,
    Responsable VARCHAR(255) NOT NULL,
    Entrada_Salida VARCHAR(255) NOT NULL,
    CONSTRAINT PK_ORDEN_DE_COMPRA PRIMARY KEY (Codigo)
);

CREATE TABLE Producto (
    Sku VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Nombre_Servicio VARCHAR(255) NOT NULL,
    Part_Number VARCHAR(255) NOT NULL,
    Stock FLOAT NOT NULL,
    Stock_min FLOAT NOT NULL,
    Unidad VARCHAR(255) NOT NULL,
    CONSTRAINT PK_PRODUCTO PRIMARY KEY (Sku)
);

CREATE TABLE Bodega (
    Ubicacion VARCHAR(255) NOT NULL,
    CONSTRAINT PK_BODEGA PRIMARY KEY (Ubicacion)
);

CREATE TABLE Estanteria (
    Bodega VARCHAR(255) NOT NULL,
    Modulo VARCHAR(255) NOT NULL,
    Posicion VARCHAR(255) NOT NULL,
    Sku_Producto VARCHAR(255) NOT NULL,
    Num_Prod_Guardados FLOAT NOT NULL,
    CONSTRAINT PK_ESTANTERIA PRIMARY KEY (Bodega, Modulo, Posicion),
    CONSTRAINT Estanteria_fk0 FOREIGN KEY (Bodega) REFERENCES Bodega(Ubicacion) ON UPDATE CASCADE,
    CONSTRAINT Estanteria_fk1 FOREIGN KEY (Sku_Producto) REFERENCES Producto(Sku) ON UPDATE CASCADE
);

CREATE TABLE Usuario (
    Rut VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    CONSTRAINT PK_USUARIO PRIMARY KEY (Rut)
);

CREATE TABLE Detalle_OC (
    Codigo_OC VARCHAR(255) NOT NULL,
    Codigo_Producto VARCHAR(255) NOT NULL,
    Cantidad FLOAT NOT NULL,
    CONSTRAINT PK_DETALLE_OC PRIMARY KEY (Codigo_OC, Codigo_Producto),
    CONSTRAINT Detalle_OC_fk0 FOREIGN KEY (Codigo_OC) REFERENCES Orden_de_compra(Codigo) ON UPDATE CASCADE,
    CONSTRAINT Detalle_OC_fk1 FOREIGN KEY (Codigo_Producto) REFERENCES Producto(Sku) ON UPDATE CASCADE
);

CREATE TABLE Proveedor (
    Id VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    CONSTRAINT PK_PROVEEDOR PRIMARY KEY (Nombre)
);

CREATE TABLE Detalle_Proveedor (
    Nombre_Prov VARCHAR(255) NOT NULL,
    Codigo_Producto VARCHAR(255) NOT NULL,
    CONSTRAINT PK_DETALLE_PROVEEDOR PRIMARY KEY (Nombre_Prov, Codigo_Producto),
    CONSTRAINT Detalle_Proveedor_fk0 FOREIGN KEY (Nombre_Prov) REFERENCES Proveedor(Nombre) ON UPDATE CASCADE,
    CONSTRAINT Detalle_Proveedor_fk1 FOREIGN KEY (Codigo_Producto) REFERENCES Producto(Sku) ON UPDATE CASCADE
);