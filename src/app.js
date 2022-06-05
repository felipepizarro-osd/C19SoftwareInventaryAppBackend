import express from "express";
import config from './config'
import productRoutes from './routes/products.routes';
import BodegasRoutes from './routes/bodega.routes';
import UsuariosRoutes from './routes/usuarios.routes';
import EstanteriaRoutes from './routes/estanteria.routes';
import OcsRoutes from './routes/ocs.routes';
import ProveedoresRoutes from './routes/proveedores.routes'
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
app.use('/api',BodegasRoutes)
app.use('/api',productRoutes)
app.use('/api',UsuariosRoutes)
app.use('/api',EstanteriaRoutes)
app.use('/api',OcsRoutes)
app.use('/api',ProveedoresRoutes)
//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;