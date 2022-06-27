import {Router} from "express";
//import { createNewProduct, getProducts ,getProductById, deleteById, updateProducts} from "../controllers/product.controller"; 
import { createNewProductBodega, getProducts ,getProductById, deleteById, updateProducts, getProductsEstanteria} from "../controllers/product.controller"; 
const router = Router();

//router.get('/products',getProducts)
router.get('/products',getProductsEstanteria)
router.post('/products',createNewProductBodega)

router.delete('/products/:sku',deleteById)

router.put('/products/:sku',updateProducts)

router.get('/products/:sku',getProductById)

export default router;