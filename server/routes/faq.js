import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getFaq } from "../controllers/faq.js";

const router = express.Router();

/* READ */
router.get("/list", verifyToken, getFaq);

export default router;