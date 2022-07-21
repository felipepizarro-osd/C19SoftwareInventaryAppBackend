import {Router} from "express";
import { crearOrdenDeCompra , crearDetalleOC, getOrdenes,getProduct} from "../controllers/ocs.controller.js";

const router = Router();
router.post('/ocs', crearOrdenDeCompra)

router.post('/ocs/:detalle', crearDetalleOC)
router.get('/ocs', getOrdenes)
router.get('/ocs/:Codigo', getProduct)


export default router;