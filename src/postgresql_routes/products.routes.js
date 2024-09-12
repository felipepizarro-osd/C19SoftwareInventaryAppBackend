import {Router} from 'express';

import { getProductsEstanteria, createNewProduct, getProducts, createNewProductOrder} from '../controllers_pg/product.controller.pg';

const router = Router();

router.get('/postgres/products_pg',getProductsEstanteria)
router.get('/postgres/all_products',getProducts)
router.post('/postgres/create_product',createNewProduct)
router.post('/postgres/create_order',createNewProductOrder)


export default router;
