# inventaryApp
# React web app with express backend connected with sql server database and material UI in the frontend

 
![](https://img.shields.io/badge/download-1K-brightgreen.svg)

##Empezemos 🚀

_clona este repositorio en tu maquina con:_

```
git clone https://github.com/felipepizarro-osd/inventaryApp.git
```
## preriquisitos 
```
npm i express cors mssql morgan dot-env @babel/preset-env babel-preset-react-app babel-loader react-router-dom 
```
_instalar como dependencias_

## Instalacion de dependencias de desarrollo
```
npm i @babel/preset-env @babel/cli @babel/core @babel/node nodemon react react-dom -D
```
###frontend compilation 
```
npm i webpack webpack-cli
```
## otra opcion es solamente usar el packege.json del repositorio clonado para instalar las dependencias
```
npm install 
```
## el package.json se debe ver de esta forma 
![image](https://user-images.githubusercontent.com/66143232/169660243-3fc88510-2480-4ff0-b763-5cf4e3b17bf7.png)

_para la compilacion de react.js a javascript en la ruta raiz necesitamos crear un archivo llamado webpack.config.js _

_esta configuracion debe especificar las rutas de los archivos del frontend hechos en react que se debe compilar _
 
 ```
 module.exports = { 
    entry : './src/app/index.js',
    output: {
        path:__dirname +'/src/public',
        filename : 'bundle.js'
    },
    module:{
        rules:[
            {
                use:'babel-loader',
                test:/\.js/,
                exclude:/node_modules/
            }
        ]
    }
}
 ```
 ## esto al compilarse se especifica que el index.js del frontend se compila en un archivo llamado bundle.js usamos la dependencia de loader del compilador babel 
 _importante excluimos la folder node_modules para que no compile lo que esta dentro y la seccion test es dejar en claro los archivos a compilar en este caso los .js con la expresion regular _
 
 ##script de package.json
_los scripts usados con la ayuda de nodemon y webpack, se requiere un script para encender el server y otro para ver los cambios en el frontend _
_El package.json quedaria de la siguiente manera_

```
"scripts": {
    "dev": "nodemon  src/index.js --exec babel-node",
    "webpack": "webpack --mode development --watch"
  },
```

![image](https://user-images.githubusercontent.com/66143232/169660695-52dd43ff-a390-4896-b11c-291c334bfa25.png)

##DEPLOYMENT
## incluir para la compilacion un archivo llamado .babelrc
dentro tiene el siguiente codigo para su funcionamiento 
```
{
    "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

##Para el backend utiliza
```
npm run dev
```

##para el frontend haga uso del repositorio 
```
https://github.com/felipepizarro-osd/inventaryAppFrontend.git
```
##luego para configurar este backend debemos modificar el archivo de connection ubicado en 

![folders](https://user-images.githubusercontent.com/66143232/180616999-eec81502-45fd-464e-8e8e-bae85014c9cb.png)

En la carpeta database se encuentra el archivo de connection 
```
import sql from 'mssql'

const sqlConfig = {
    database:'insert name of your database name',
    user:'insert ypur user name',
    password:'insert your password of the user in mssql',
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  
  export async function conn() {
   try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig)
    return pool;
   } catch (err) {
    console.log('err');
   }
  }
export {sql};
```
##con esta modificacin puede acceder a la base de datos con el programa de back end 
##cabe destacar que la base de datos tiene que ser previamente creada con estos scripts en orden 
```
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

```
##dependiendo de las herramientas que use el codigo debe ser minimamente modificado el anterior esta orientado a terminal de mssql
##dejamos u link de referncia para la creacion y ejecucion de codigo sql en linux 

https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16

##dejamos en el tintero otro codigo para ejecutar en el database maneger system 
#Dbeaver

```
CREATE TABLE [Orden_de_compra] (
	Codi varchar(255) NOT NULL,
	Fecha date NOT NULL,
	Responsable varchar(255) NOT NULL,
	Entrada_Salida varchar(255) NOT NULL,
  CONSTRAINT [PK_ORDEN_DE_COMPRA] PRIMARY KEY CLUSTERED
  (
  [Codi] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

);

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

CREATE TABLE [Bodega] (
	Ubicacion varchar(255) NOT NULL,
  CONSTRAINT [PK_BODEGA] PRIMARY KEY CLUSTERED
  (
  [Ubicacion] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)

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

CREATE TABLE [Usuario] (
	Rut varchar(255) NOT NULL,
	Nombre varchar(255) NOT NULL,
	Contrasena varchar(255) NOT NULL,
  	CONSTRAINT [PK_USUARIO] PRIMARY KEY CLUSTERED
  	(
  	[Rut] ASC
  	) WITH (IGNORE_DUP_KEY = OFF)

)

CREATE TABLE [Detalle_OC] (
	Codi_OC varchar(255) NOT NULL,
	Codi_Producto varchar(255) NOT NULL,
	Cantidad float NOT NULL,
	CONSTRAINT [PK_DETALLE_OC] PRIMARY KEY CLUSTERED
	(Codi_OC,Codi_Producto) 
	WITH (IGNORE_DUP_KEY = OFF)

)

CREATE TABLE [Proveedor] (
	Nombre varchar(255) NOT NULL,
  CONSTRAINT [PK_PROVEEDOR] PRIMARY KEY CLUSTERED
  (
  [Nombre] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)

CREATE TABLE [Detalle_Proveedor] (
	Nombre_Prov varchar(255) NOT NULL,
	Codi_Producto varchar(255) NOT NULL,
  	CONSTRAINT [PK_DETALLE_PROVEEDOR] PRIMARY KEY CLUSTERED
  	(Nombre_Prov,Codi_Producto) 
	WITH (IGNORE_DUP_KEY = OFF)

)



ALTER TABLE [Estanteria] WITH CHECK ADD CONSTRAINT [Estanteria_fk0] FOREIGN KEY ([Bodega]) REFERENCES [Bodega]([Ubicacion])
ON UPDATE CASCADE

ALTER TABLE [Estanteria] CHECK CONSTRAINT [Estanteria_fk0]

ALTER TABLE [Estanteria] WITH CHECK ADD CONSTRAINT [Estanteria_fk1] FOREIGN KEY ([Sku_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE

ALTER TABLE [Estanteria] CHECK CONSTRAINT [Estanteria_fk1]



ALTER TABLE [Detalle_OC] WITH CHECK ADD CONSTRAINT [Detalle_OC_fk0] FOREIGN KEY ([Codi_OC]) REFERENCES [Orden_de_compra]([Codi])
ON UPDATE CASCADE

ALTER TABLE [Detalle_OC] CHECK CONSTRAINT [Detalle_OC_fk0]

ALTER TABLE [Detalle_OC] WITH CHECK ADD CONSTRAINT [Detalle_OC_fk1] FOREIGN KEY ([Codi_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE

ALTER TABLE [Detalle_OC] CHECK CONSTRAINT [Detalle_OC_fk1]



ALTER TABLE [Detalle_Proveedor] WITH CHECK ADD CONSTRAINT [Detalle_Proveedor_fk0] FOREIGN KEY ([Nombre_Prov]) REFERENCES [Proveedor]([Nombre])
ON UPDATE CASCADE

ALTER TABLE [Detalle_Proveedor] CHECK CONSTRAINT [Detalle_Proveedor_fk0]

ALTER TABLE [Detalle_Proveedor] WITH CHECK ADD CONSTRAINT [Detalle_Proveedor_fk1] FOREIGN KEY ([Codi_Producto]) REFERENCES [Producto]([Sku])
ON UPDATE CASCADE

ALTER TABLE [Detalle_Proveedor] CHECK CONSTRAINT [Detalle_Proveedor_fk1]


```
##Dejamos un archivo para testear la base de datos con estos insert

[db-insert.txt](https://github.com/felipepizarro-osd/C19SoftwareInventaryAppBackend/files/9174428/db-insert.txt)

#con esto el comando 
```
npm run dev
```
#no olvidar instalar dependencias faltantes de npm

```
npm -i 
```
##Con esto instalamos o reintalamos las dependencias por temas de espacio no los ponemos en el repositorio  es necesario hacer esto 
###cabe destacar que las instalaciones suelen ser de desarrollo por lo que es necesario al haber algun error instalando requiere esto 

```
npm i --peer-legacy
```
