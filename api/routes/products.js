import express from "express";
import { addProduts, deleteProducts, getProducts, updateProducts, getProductsByOrder } from "../controllers/products.js";

const router = express.Router()

router.get("/products", getProducts)

router.get("/products/productsbyorder/:idTabUsuario", getProductsByOrder)

router.post("/products", addProduts)

router.put("/products/edit/:idTabProdutos", updateProducts)

router.delete("/products/delete/:idTabProdutos", deleteProducts)

export default router
