import {Router} from "express";
import { crearUsuario, getUsuario, getUsuariobyRUT, getUsuariobyRutPassword } from "../controllers/usuarios.controller.js";

const router = Router();
router.post('/usuarios', crearUsuario)
router.get('/usuarios', getUsuario)
router.get('/usuarios/:rut', getUsuariobyRUT)
router.post('/login/', getUsuariobyRutPassword)
export default router;