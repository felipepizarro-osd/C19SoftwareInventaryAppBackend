import {Router} from "express";
import { crearUsuario, getUsuario, getUsuariobyRUT } from "../controllers/usuarios.controller.js";

const router = Router();
router.post('/usuarios', crearUsuario)
router.get('/usuarios', getUsuario)
router.get('/usuarios/:rut', getUsuariobyRUT)
export default router;