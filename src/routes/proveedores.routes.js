import {Router} from "express";
import { crearProveedor, crearDetalleProveedor, getProveedor} from "../controllers/proveedores.controller"; 

const router = Router();

router.post('/proveedores', crearProveedor)

router.post('/proveedores/:detalle', crearDetalleProveedor)

router.get('/proveedores', getProveedor)

export default router;