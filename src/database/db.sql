CREATE TABLE [Orden_de_compra] (
	Codigo varchar(255) NOT NULL,
	Fecha date NOT NULL,
	Responsable varchar(255) NOT NULL,
	Entrada_Salida varchar(255) NOT NULL,
  CONSTRAINT [PK_ORDEN_DE_COMPRA] PRIMARY KEY CLUSTERED
  (
  [Codigo] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

);
GO
CREATE TABLE [Producto] (
	Sku varchar(255) NOT NULL,
	Nombre varchar(255) NOT NULL,
	Nombre_Servicio varchar(255) NOT NULL,
	Part_Number varchar(255) NOT NULL,
	Stock float NOT NULL,
	Stock_min float NOT NULL,
	Unidad varchar(255) NOT NULL,
  CONSTRAINT [PK_PRODUCTO] PRIMARY KEY CLUSTERED
  (
  [Sku] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Bodega] (
	Ubicacion varchar(255) NOT NULL,
  CONSTRAINT [PK_BODEGA] PRIMARY KEY CLUSTERED
  (
  [Ubicacion] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Estanteria] (
	Bodega varchar(255) NOT NULL,
	Modulo varchar(255) NOT NULL,
	Posicion varchar(255) NOT NULL,
	Sku_Producto varchar(255) NOT NULL,
	Num_Prod_Guardados float NOT NULL,
  	CONSTRAINT [PK_ESTANTERIA] PRIMARY KEY CLUSTERED
  	(Bodega,Modulo,Posicion)
  	WITH (IGNORE_DUP_KEY = OFF)
)
GO
CREATE TABLE [Usuario] (
	Rut varchar(255) NOT NULL,
	Nombre varchar(255) NOT NULL,
	Contrasena varchar(255) NOT NULL,
  	CONSTRAINT [PK_USUARIO] PRIMARY KEY CLUSTERED
  	(
  	[Rut] ASC
  	) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Detalle_OC] (
	Codigo_OC varchar(255) NOT NULL,
	Codigo_Producto varchar(255) NOT NULL,
	Cantidad float NOT NULL,
	CONSTRAINT [PK_DETALLE_OC] PRIMARY KEY CLUSTERED
	(Codigo_OC,Codigo_Producto) 
	WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Proveedor] (
	Nombre varchar(255) NOT NULL,
  CONSTRAINT [PK_PROVEEDOR] PRIMARY KEY CLUSTERED
  (
  [Nombre] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Detalle_Proveedor] (
	Nombre_Prov varchar(255) NOT NULL,
	Codigo_Producto varchar(255) NOT NULL,
  	CONSTRAINT [PK_DETALLE_PROVEEDOR] PRIMARY KEY CLUSTERED
  	(Nombre_Prov,Codigo_Producto) 
	WITH (IGNORE_DUP_KEY = OFF)

)
GO


ALTER TABLE [Estanteria] WITH CHECK ADD CONSTRAINT [Estanteria_fk0] FOREIGN KEY ([Bodega]) REFERENCES [Bodega]([Ubicacion])
ON UPDATE CASCADE
GO
ALTER TABLE [Estanteria] CHECK CONSTRAINT [Estanteria_fk0]
GO
ALTER TABLE [Estanteria] WITH CHECK ADD CONSTRAINT [Estanteria_fk1] FOREIGN KEY ([Sku_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE
GO
ALTER TABLE [Estanteria] CHECK CONSTRAINT [Estanteria_fk1]
GO


ALTER TABLE [Detalle_OC] WITH CHECK ADD CONSTRAINT [Detalle_OC_fk0] FOREIGN KEY ([Codigo_OC]) REFERENCES [Orden_de_compra]([Codigo])
ON UPDATE CASCADE
GO
ALTER TABLE [Detalle_OC] CHECK CONSTRAINT [Detalle_OC_fk0]
GO
ALTER TABLE [Detalle_OC] WITH CHECK ADD CONSTRAINT [Detalle_OC_fk1] FOREIGN KEY ([Codigo_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE
GO
ALTER TABLE [Detalle_OC] CHECK CONSTRAINT [Detalle_OC_fk1]
GO


ALTER TABLE [Detalle_Proveedor] WITH CHECK ADD CONSTRAINT [Detalle_Proveedor_fk0] FOREIGN KEY ([Nombre_Prov]) REFERENCES [Proveedor]([Nombre])
ON UPDATE CASCADE
GO
ALTER TABLE [Detalle_Proveedor] CHECK CONSTRAINT [Detalle_Proveedor_fk0]
GO
ALTER TABLE [Detalle_Proveedor] WITH CHECK ADD CONSTRAINT [Detalle_Proveedor_fk1] FOREIGN KEY ([Codigo_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE
GO
ALTER TABLE [Detalle_Proveedor] CHECK CONSTRAINT [Detalle_Proveedor_fk1]
GO
