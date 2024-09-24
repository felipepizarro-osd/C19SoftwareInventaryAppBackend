import {Router} from 'express';

import { actualizarBodega,crearBodega,eliminarBodega,obtenerBodegas } from '../controllers_pg/bodega.controller.pg';

const router = Router();

router.post('/postgres/crear_bodega',crearBodega)
router.get('/postgres/all_bodegas',obtenerBodegas)
export default router;