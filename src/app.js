import express from "express";
import config from './config'
import productRoutes from './routes/products.routes';
import morgan from "morgan";
const path = require('path')
const app = express();


//settings
app.set('port', config.port || 3000);
//middlewares
app.use(morgan('dev'))
//recibe json
app.use(express.json());
//reciba formularios html
app.use(express.urlencoded({extended:false}));
//rutas
app.use('/api',productRoutes)
<<<<<<< Updated upstream
=======
app.use('/api',UsuariosRoutes)
app.use('/api',EstanteriaRoutes)
app.use('/api',OcsRoutes)
app.use('/api',ProveedoresRoutes)
>>>>>>> Stashed changes

//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;