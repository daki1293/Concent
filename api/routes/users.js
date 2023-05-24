import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/edit/:idTabUsuario", updateUser)

router.delete("/delete/:idTabUsuario", deleteUser)

export default router