import {Router} from "express";
import { crearEstanteria,  
        getModuloYPosicionByUbicacion,
        getEstanteria,
        crearEstanteriaX,
        deleteByCombinacion
    } from "../controllers/estanteria.controller.js";

const router = Router();

router.get('/estanterias', getEstanteria)
router.get('/estanterias/:bodega', getModuloYPosicionByUbicacion)
router.post('/estanterias',crearEstanteriaX)
router.delete('/estanterias',deleteByCombinacion)
//router.post('/estanterias/:detalle',crearEstanteriaX)
export default router;