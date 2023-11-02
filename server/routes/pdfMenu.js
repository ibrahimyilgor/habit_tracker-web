import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPdf, savePdf } from "../controllers/pdfMenu.js";

const router = express.Router();

/* READ */
router.get("/:restaurant_id", getPdf);

/* SAVE */
router.put("/save", verifyToken, savePdf);

export default router;
