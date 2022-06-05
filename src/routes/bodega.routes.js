import {Router} from "express";
import { crearBodega } from "../controllers/bodega.controller.js";

const router = Router();
router.post('/bodegas',crearBodega)
export default router;