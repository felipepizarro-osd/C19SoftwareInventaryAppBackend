import {Router} from 'express';

import { actualizarBodega,crearBodega,eliminarBodega,obtenerBodegas, getBodegas } from '../controllers_pg/bodega.controller.pg';

const router = Router();

router.post('/postgres/crear_bodega',crearBodega)
router.get('/postgres/all_bodegas',obtenerBodegas)router.get('/postgres/get_bodegas',getBodegas)

export default router;