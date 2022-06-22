import {Router} from "express";
<<<<<<< Updated upstream
import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts, crearBodega} from "../controllers/product.controller"; 
=======
import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts, getProductsEstanteria} from "../controllers/product.controller"; 
>>>>>>> Stashed changes

const router = Router();

router.get('/products',getProductsEstanteria)

router.post('/products',createNewProduct)

router.delete('/products/:sku',deleteById)

router.put('/products/:sku',updateProducts)

router.get('/products/:sku',getProductById)

router.post('/bodegas',crearBodega)

export default router;