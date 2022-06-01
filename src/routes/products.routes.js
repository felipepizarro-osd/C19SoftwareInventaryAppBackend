import {Router} from "express";
import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts, crearBodega, crearEstanteria, crearUsuario,getUsuario, crearOrdenDeCompra, crearProveedor, crearDetalleProveedor, crearDetalleOC} from "../controllers/product.controller"; 

const router = Router();

router.get('/products',getProducts)

router.post('/products',createNewProduct)

router.delete('/products/:sku',deleteById)

router.put('/products/:sku',updateProducts)

router.get('/products/:sku',getProductById)

router.post('/bodegas',crearBodega)

router.post('/estanterias',crearEstanteria)

router.post('/usuarios', crearUsuario)

router.get('/usuarios/:rut',getUsuario)

router.post('/ocs', crearOrdenDeCompra)

router.post('/proveedores', crearProveedor)

router.post('/proveedores/:detalle', crearDetalleProveedor)

router.post('/ocs/:detalle', crearDetalleOC)

export default router;