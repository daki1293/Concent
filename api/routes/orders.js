import express from "express";
import { addOrder, deleteOrder, getOrder, updateOrder, getOrdersByIdUser } from "../controllers/orders.js";

const router = express.Router()

router.get("/orders", getOrder)

router.get("/orders/orderbyiduser/:idTabUsuario", getOrdersByIdUser)

router.post("/orders", addOrder)

router.put("/orders/edit/:idTabPedido", updateOrder)

router.delete("/orders/delete/:idTabPedido", deleteOrder)

export default router