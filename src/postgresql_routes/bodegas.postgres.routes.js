import {Router} from 'express';

import { getBodegas, createBodega,deleteBodega, updateBodega} from '../controllers_pg/bodega.controller.pg';

const router = Router();

router.post('/postgres/crear_bodega',createBodega)
router.get('/postgres/all_bodegas',getBodegas)

export default router;