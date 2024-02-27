import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllRestaurantVisitForAUser,
  getRestaurantVisit,
} from "../controllers/restauranVisit.js";

const router = express.Router();

/* READ VISIT */
router.get(
  "/getRestaurantVisit/:restaurant_ids",
  verifyToken,
  getRestaurantVisit
);

/* READ VISITS OF ALL RESTAURANTS OF A USER */
router.get(
  "/getAllRestaurantVisitForAUser/:user_id",
  verifyToken,
  getAllRestaurantVisitForAUser
);

export default router;
