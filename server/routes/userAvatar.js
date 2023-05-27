import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserAvatar, saveUserAvatar } from "../controllers/userAvatar.js";

const router = express.Router();

/* READ */
router.get("/:user_id", getUserAvatar);

/* SAVE */
router.put("/save", verifyToken, saveUserAvatar);

export default router;