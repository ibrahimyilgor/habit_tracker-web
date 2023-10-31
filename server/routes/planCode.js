import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { useCode } from "../controllers/planCode.js";

const router = express.Router();

/* READ */
router.put("/useCode", verifyToken, useCode);

export default router;