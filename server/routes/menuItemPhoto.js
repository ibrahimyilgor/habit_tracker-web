import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  deleteMenuItemPhoto,
  deleteMenuItemPhotoByMenuId,
  getMenuItemPhoto,
  saveMenuItemPhoto,
} from "../controllers/menuItemPhoto.js";

const router = express.Router();

/* READ */
router.get("/getMenuItemPhoto/:menuItemId", getMenuItemPhoto);

/* SAVE */
router.put("/save", verifyToken, saveMenuItemPhoto);

/* DELETE BY MENU_ID */
router.delete("/deleteMenuItemPhoto/:id", deleteMenuItemPhotoByMenuId);

/* DELETE BY MENU_ITEM_ID */
router.delete("/deleteOneMenuItemPhoto/:id", deleteMenuItemPhoto);

export default router;
