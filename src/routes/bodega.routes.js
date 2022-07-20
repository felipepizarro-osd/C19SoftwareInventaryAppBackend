import {Router} from "express";
import { 
    crearBodega,
    getBodegaByName,
    getBodegas
    } from "../controllers/bodega.controller";

const router = Router();
router.post('/bodegas',crearBodega)

router.get('/bodegas/:Ubicacion',getBodegaByName)

router.get('/bodegas', getBodegas)
export default router;