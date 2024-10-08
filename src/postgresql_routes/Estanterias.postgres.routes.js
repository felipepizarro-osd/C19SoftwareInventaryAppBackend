import {Router} from 'express';

import { crearEstanteria, getEstanterias, getModuloYPosicionByUbicacion, crearEstanteriaX, deleteByCombinacion} from '../controllers_pg/estanteria.controller.pg';

const router = Router();

router.post('/postgres/crear_estanteria',crearEstanteria)
router.get('/postgres/getEstanterias',getEstanterias)
router.get('/postgres/getModuloYPosicionByUbicacion',getModuloYPosicionByUbicacion)
router.post('/postgres/crearEstanteriaX',crearEstanteriaX)
router.delete('/postgres/deleteByCombinacion',deleteByCombinacion)

export default router;
