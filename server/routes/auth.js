import express from "express";
import { login, register, updatePassword } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LOGIN */
router.post("/login", login);

/* LOGIN */
router.post("/register", register);

/* UPDATE PASSWORD */
router.put("/updatePassword", verifyToken, updatePassword);

export default router;