import {Router} from "express";
import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts, crearBodega, crearEstanteria, crearUsuario, crearOrdenDeCompra, crearProveedor, crearDetalleProveedor, crearDetalleOC, getUsuario, getUsuariobyRUT, getProveedor, getModuloYPosicionByUbicacion} from "../controllers/product.controller"; 

const router = Router();

router.get('/products',getProducts)

router.post('/products',createNewProduct)

router.delete('/products/:sku',deleteById)

router.put('/products/:sku',updateProducts)

router.get('/products/:sku',getProductById)

router.post('/bodegas',crearBodega)

router.post('/estanterias',crearEstanteria)

router.post('/usuarios', crearUsuario)

router.post('/ocs', crearOrdenDeCompra)

router.post('/proveedores', crearProveedor)

router.post('/proveedores/:detalle', crearDetalleProveedor)

router.post('/ocs/:detalle', crearDetalleOC)

router.get('/usuarios', getUsuario)

router.get('/usuarios/:rut', getUsuariobyRUT)

router.get('/proveedores', getProveedor)

router.get('/estanterias/:bodega', getModuloYPosicionByUbicacion)
export default router;