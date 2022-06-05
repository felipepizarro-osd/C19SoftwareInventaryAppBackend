import express from "express";
import config from './config'
import productRoutes from './routes/products.routes';
import morgan from "morgan";
const path = require('path')
const app = express();
import cors from 'cors';

//settings
app.set('port', config.port || 3000);
//middlewares
app.use(morgan('dev'))
//recibe json
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(express.json());
//reciba formularios html
app.use(express.urlencoded({extended:false}));
//rutas
app.use('/api',productRoutes)

//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;