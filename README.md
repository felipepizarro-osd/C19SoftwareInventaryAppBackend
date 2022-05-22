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

##Para el backend utiliza
```
npm run dev
```

##para el frontend
```
npm run webpack
```
## incluir para la compilacion un archivo llamado .babelrc
dentro tiene el siguiente codigo para su funcionamiento 
```
{
    "presets": ["@babel/preset-env","@babel/preset-react"]
}
```
