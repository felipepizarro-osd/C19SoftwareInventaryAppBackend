import {Router} from "express";
import { crearEstanteria,  getModuloYPosicionByUbicacion } from "../controllers/estanteria.controller.js";

const router = Router();
router.post('/estanterias',crearEstanteria)
router.get('/estanterias/:bodega', getModuloYPosicionByUbicacion)
export default router;