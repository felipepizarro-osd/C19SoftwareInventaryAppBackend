import express from "express";
import config from './config'
import productRoutes from './routes/products.routes';
import morgan from "morgan";
const path = require('path')
const app = express();


//settings
app.set('port', config.port || 4000);
//middlewares
app.use(morgan('dev'))
//recibe json
app.use(express.json());
//reciba formularios html
app.use(express.urlencoded({extended:false}));
//rutas
app.use('/api',productRoutes)

//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;