import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllNotifications,
  addNotification,
  deleteNotification,
  updateNotification,
  getNotificationsForAUser,
} from "../controllers/notification.js";

const router = express.Router();

/* READ ALL */
router.get("/getAllNotifications", verifyToken, getAllNotifications);

/* ADD */
router.post("/addNotification", verifyToken, addNotification);

/* DELETE */
router.delete("/:id/deleteNotification", verifyToken, deleteNotification);

/* UPDATE */
router.put("/:id/updateNotification", verifyToken, updateNotification);

/* READ FOR A USER */
router.get(
  "/:user_id/:plan_id/getNotificationsForAUser",
  verifyToken,
  getNotificationsForAUser
);

export default router;
