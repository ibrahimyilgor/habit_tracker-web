import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getRestaurantVisit } from "../controllers/restauranVisit.js";

const router = express.Router();

/* READ VISIT */
router.get(
  "/getRestaurantVisit/:restaurant_ids",
  verifyToken,
  getRestaurantVisit
);

export default router;
