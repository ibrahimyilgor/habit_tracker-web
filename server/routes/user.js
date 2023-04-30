import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.put("/updateUser", verifyToken, updateUser);

/* DELETE */
router.delete("/:id/deleteUser", verifyToken, deleteUser);

export default router;