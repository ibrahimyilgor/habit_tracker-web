import express from "express";
import { getAccount } from "../controllers/account.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getAccount);

export default router;