import {Router} from "express";
import { 
    crearDetalleProveedor,
    getPyP,
    deleteByCombinacionPYP
    } from "../controllers/pyp.controller";  

const router = Router();

router.get('/pyp', getPyP)

router.post('/pyp', crearDetalleProveedor)

router.delete('/pyp',deleteByCombinacionPYP)

export default router;