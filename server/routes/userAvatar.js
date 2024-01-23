import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  deletUserAvatar,
  getUserAvatar,
  getUserAvatarByRestaurantId,
  saveUserAvatar,
} from "../controllers/userAvatar.js";

const router = express.Router();

/* READ */
router.get("/:user_id", getUserAvatar);

/* READ BY RESTAURANT ID*/
router.get(
  "/getAvatarByRestaurantId/:restaurant_id",
  getUserAvatarByRestaurantId
);

/* SAVE */
router.put("/save", verifyToken, saveUserAvatar);

/* DELETE */
router.delete("/deleteUserAvatar/:id", deletUserAvatar);

export default router;
