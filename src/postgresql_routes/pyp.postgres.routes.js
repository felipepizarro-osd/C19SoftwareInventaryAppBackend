import {Router} from "express";
import {crearDetalleProveedor,getPyP,deleteByCombinacionPYP} from "../controllers_pg/pyp.controller.pg";  

const router = Router();

router.get('/postgres/all_pyp', getPyP)
router.post('/postgres/create_Pyp', crearDetalleProveedor)
router.delete('/postgres/delete_Pyp',deleteByCombinacionPYP)

export default router;