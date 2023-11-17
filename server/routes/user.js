import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ ALL USERS*/
router.get("/getAllUsers", verifyToken, getAllUsers);

/* READ */
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.put("/updateUser", verifyToken, updateUser);

/* DELETE */
router.delete("/:id/deleteUser", verifyToken, deleteUser);

export default router;
