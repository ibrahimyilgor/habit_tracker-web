import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getMenuItemPhoto,
  saveMenuItemPhoto,
} from "../controllers/MenuItemPhoto.js";

const router = express.Router();

/* READ */
router.get("/getMenuItemPhoto/:menuItemId", getMenuItemPhoto);

/* SAVE */
router.put("/save", verifyToken, saveMenuItemPhoto);

export default router;
