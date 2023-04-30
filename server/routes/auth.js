import express from "express";
import { login, updatePassword } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LOGIN */
router.post("/login", login);

/* UPDATE PASSWORD */
router.put("/updatePassword", verifyToken, updatePassword);

export default router;