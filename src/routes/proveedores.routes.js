import {Router} from "express";
import { 
    crearProveedor, 
    crearDetalleProveedor, 
    getProveedor, 
    getProveedorByName
    } from "../controllers/proveedores.controller";  

const router = Router();

router.post('/proveedores', crearProveedor)

router.post('/proveedores/:detalle', crearDetalleProveedor)

router.get('/proveedores', getProveedor)

router.get('/proveedores/:nombre',getProveedorByName)

export default router;