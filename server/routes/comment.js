import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getComments, deleteComment, addComment, getAverageRateOfCommentsInLast30Days } from "../controllers/comment.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getComments);

/* DELETE */
router.delete("/:id/deleteComment", verifyToken, deleteComment);

/* ADD */
router.post("/:restaurantId/addComment", addComment);

/* GET AVERAGE RATE OF COMMENTS */
router.get("/average/:id", verifyToken, getAverageRateOfCommentsInLast30Days);

export default router;