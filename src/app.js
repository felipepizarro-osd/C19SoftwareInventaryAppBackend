import express from "express";
import config from './config'
import productRoutes from './routes/products.routes';
import BodegasRoutes from './routes/bodega.routes';
import UsuariosRoutes from './routes/usuarios.routes';
import EstanteriaRoutes from './routes/estanteria.routes';
import OcsRoutes from './routes/ocs.routes';
import ProveedoresRoutes from './routes/proveedores.routes'
import pypRoutes from './routes/pyp.routes';
import productroutesPG from './postgresql_routes/products.routes';
import BodegasRoutesPG from './postgresql_routes/bodegas.postgres.routes';
import EstanteriaRoutesPG from './postgresql_routes/Estanterias.postgres.routes';
import morgan from "morgan";
const path = require('path')
const app = express();
import cors from 'cors';

//settings
app.set('port', config.port || 4000);
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
app.use('/api',BodegasRoutes)
app.use('/api',productRoutes)
app.use('/api',UsuariosRoutes)
app.use('/api',EstanteriaRoutes)
app.use('/api',OcsRoutes)
app.use('/api',ProveedoresRoutes)
app.use('/api',pypRoutes)
app.use('/api',productroutesPG)
app.use('/api',BodegasRoutesPG)
app.use('/api',EstanteriaRoutesPG)
//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;