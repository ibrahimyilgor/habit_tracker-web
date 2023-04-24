import express from "express";
import { addBranch, getBranches } from "../controllers/restaurant.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getBranches);

/* ADD */
router.post("/:userId/addBranch", verifyToken, addBranch);

export default router;