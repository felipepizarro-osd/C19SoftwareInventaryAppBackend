import {Router} from "express";
import { crearOrdenDeCompra , crearDetalleOC} from "../controllers/ocs.controller.js";

const router = Router();
router.post('/ocs', crearOrdenDeCompra)

router.post('/ocs/:detalle', crearDetalleOC)
export default router;