import {Router} from "express";
import { crearUsuario, getUsuarios, getUsuario } from "../controllers/usuarios.controller.js";

const router = Router();
router.post('/usuarios', crearUsuario)
router.get('/usuarios', getUsuarios)
router.get('/usuarios/:rut', getUsuario)
export default router;