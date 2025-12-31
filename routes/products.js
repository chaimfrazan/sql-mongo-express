import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products.js";

const router = Router()

router.post('/api/products', createProduct)
router.get('/api/products', getProducts)
export default router