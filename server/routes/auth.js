import express from "express";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  updatePassword,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LOGIN */
router.post("/login", login);

/* REGISTER */
router.post("/register", register);

/* FORGOT PASSWORD */
router.post("/forgotPassword", forgotPassword);

/* UPDATE PASSWORD */
router.put("/updatePassword", verifyToken, updatePassword);

/* UPDATE PASSWORD */
router.put("/changePassword", changePassword);

export default router;
