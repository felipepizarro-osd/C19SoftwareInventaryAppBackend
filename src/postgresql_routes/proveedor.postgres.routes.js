import {Router} from 'express';
import {createProveedor,getProveedor,searchProveedorById} from "../controllers_pg/proveedor.controller.pg";

const router = Router();

router.get("/postgres/all_proveedores",getProveedor);
router.post("/postgres/create_proveedor",createProveedor);
router.get("/postgres/proveedor_pg",searchProveedorById);

export default router;
