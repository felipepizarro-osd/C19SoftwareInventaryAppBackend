import {Router} from 'express';

import { crearBodega } from '../controllers_pg/bodega.controller.pg';

const router = Router();

router.post('/postgres/crear_bodega',crearBodega)

export default router;