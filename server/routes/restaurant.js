import express from "express";
import { addBranch, deleteBranch, getBranches, saveMenu, updateBranch } from "../controllers/restaurant.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getBranches);

/* ADD */
router.post("/:userId/addBranch", verifyToken, addBranch);

/* DELETE */
router.delete("/:id/:userId/deleteBranch", verifyToken, deleteBranch);

/* UPDATE */
router.put("/updateBranch", verifyToken, updateBranch);

/* ADD MENU */
router.put("/:branchId/saveMenu", verifyToken, saveMenu);

export default router;