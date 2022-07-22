import {Router} from "express";
import { 
    crearBodega,
    getBodegaByName,
    getBodegas
    } from "../controllers/bodega.controller";

const router = Router();
router.post('/bodegas',crearBodega)


router.get('/bodegas', getBodegas)

router.get('/bodegas/:Ubicacion',getBodegaByName)

export default router;