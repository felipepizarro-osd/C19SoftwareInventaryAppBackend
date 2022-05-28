import {Router} from "express";
import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts, crearBodega} from "../controllers/product.controller"; 

const router = Router();

router.get('/products',getProducts)

router.post('/products',createNewProduct)

router.delete('/products/:sku',deleteById)

router.put('/products/:sku',updateProducts)

router.get('/products/:sku',getProductById)

router.post('/bodegas',crearBodega)

export default router;