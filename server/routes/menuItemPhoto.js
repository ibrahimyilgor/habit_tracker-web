import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  deleteMenuItemPhotoByMenuId,
  getMenuItemPhoto,
  saveMenuItemPhoto,
} from "../controllers/MenuItemPhoto.js";

const router = express.Router();

/* READ */
router.get("/getMenuItemPhoto/:menuItemId", getMenuItemPhoto);

/* SAVE */
router.put("/save", verifyToken, saveMenuItemPhoto);

/* DELETE BY MENU_ID */
router.delete("/deleteMenuItemPhoto/:id", deleteMenuItemPhotoByMenuId);

export default router;
