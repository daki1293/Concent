import express from "express";
import { addUser, deleteUser, getUsers, updateUser, getUsersByCpf } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.get("/usersbycpf/:TabUsuarioCpf", getUsersByCpf)

router.post("/", addUser)

router.put("/edit/:idTabUsuario", updateUser)

router.delete("/delete/:idTabUsuario", deleteUser)

export default router