import express from "express";
import { addProduts, deleteProduts, getProduts, updateProduts, getProductsByOrder } from "../controllers/products.js";

const router = express.Router()

router.get("/products", getProduts)

router.get("/products/productsbyorder/:idTabUsuario", getProductsByOrder)

router.post("/products", addProduts)

router.put("/products/edit/:idTabProdutos", updateProduts)

router.delete("/products/delete/:idTabProdutos", deleteProduts)

export default router
