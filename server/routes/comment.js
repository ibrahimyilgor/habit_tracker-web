import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getComments, deleteComment } from "../controllers/comment.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getComments);

router.delete("/:id/deleteComment", verifyToken, deleteComment);

export default router;