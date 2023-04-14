import express from "express";
import { getAccount, updateAccount } from "../controllers/account.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getAccount);

/* UPDATE */
router.put("/updateAccount", verifyToken, updateAccount);

export default router;