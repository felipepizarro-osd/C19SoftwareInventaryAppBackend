import express from "express";
import config from './config'

import ocsRoutesPG from './postgresql_routes/ocs.postgres.routes';
import productroutesPG from './postgresql_routes/products.postgres.routes';
import BodegasRoutesPG from './postgresql_routes/bodegas.postgres.routes';
import proveedorRoutesPG from './postgresql_routes/proveedor.postgres.routes';
import pypRoutesPG from './postgresql_routes/pyp.postgres.routes';

import morgan from "morgan";
const path = require('path')
const app = express();
import cors from 'cors';

//settings
app.set('port', config.port || 4000);
//middlewares
app.use(morgan('dev'))
//recibe json

app.use(cors())
  
app.use(express.json());
//reciba formularios html
app.use(express.urlencoded({extended:false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//rutas
app.use('/api',ocsRoutesPG)
app.use('/api',productroutesPG)
app.use('/api',BodegasRoutesPG)
app.use('/api',proveedorRoutesPG)
app.use('/api',pypRoutesPG)
//static files
console.log(path.join(__dirname,'public')); 
app.use(express.static(path.join(__dirname,'public')))
export default app;