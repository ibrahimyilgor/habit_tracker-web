import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPlan } from "../controllers/plan.js";

const router = express.Router();

/* READ */
router.get("/list", verifyToken, getPlan);

export default router;