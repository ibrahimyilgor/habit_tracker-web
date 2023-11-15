import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addCode,
  deleteCode,
  getCodes,
  updateCode,
  useCode,
} from "../controllers/planCode.js";

const router = express.Router();

/* USE CODE */
router.put("/useCode", verifyToken, useCode);

/* GET CODES */
router.get("/getCodes", verifyToken, getCodes);

/* DELETE */
router.delete("/:id/deleteCode", verifyToken, deleteCode);

/* ADD */
router.post("/addCode", verifyToken, addCode);

/* UPDATE */
router.put("/:id/updateCode", verifyToken, updateCode);

export default router;
