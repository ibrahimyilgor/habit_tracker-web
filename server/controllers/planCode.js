import Comment from "../models/Comment.js";
import MenuPdf from "../models/MenuPdf.js";
import PlanCode from "../models/PlanCode.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import { PLAN_IDS } from "../utils/constants.js";

// USE CODE

export const useCode = async (req, res) => {
  try {
    const { plan_id, user_id, code } = req.body;

    // Find a PlanCode that matches the provided plan_id and code
    const planCode = await PlanCode.findOne({
      plan_id: plan_id,
      code: code,
    });

    if (planCode) {
      // Delete the found PlanCode
      await PlanCode.findByIdAndDelete(planCode._id);

      // Update the user's plan_id

      let date = new Date();
      if (plan_id === PLAN_IDS[0]) {
        date = new Date("9999-12-12");
      } else {
        date.setDate(date.getDate() + planCode.duration_in_days);
      }

      const updateUserResult = await User.updateOne(
        { _id: user_id },
        { $set: { plan_id: plan_id, plan_expiration_date: date } }
      );

      if (updateUserResult.nModified === 0) {
        // No user was updated, handle accordingly
        return res.status(404).json({
          message: "User not found or plan_id not updated.",
          success: false,
        });
      }

      if (plan_id === PLAN_IDS[0]) {
        // If switching to BASIC Plan
        // Delete all restaurants
        await Restaurant.deleteMany({
          user_id: user_id,
        }).catch((err) => {
          res.status(404).json({
            message:
              "Could not delete restaurants while switching to BASIC Plan",
            success: false,
          });
        });

        // Delete all pdfMenus
        await MenuPdf.deleteMany({
          restaurant_id: { $in: updateUserResult.restaurants },
        }).catch((err) => {
          res.status(404).json({
            message: "Could not delete menu pdfs while switching to BASIC Plan",
            success: false,
          });
        });

        // Delete the comments
        await Comment.deleteMany({
          user_id: user_id,
        }).catch((err) => {
          res.status(404).json({
            message: "Could not delete comments while switching to BASIC Plan",
            success: false,
          });
        });

        // Update user's restaurants array
        await User.updateOne(
          { _id: user_id },
          { $set: { restaurants: [] } }
        ).catch((err) => {
          res.status(404).json({
            message:
              "Could not update user's restaurants to [] while switching to BASIC Plan",
            success: false,
          });
        });
      }

      // Success: PlanCode updated and associated operations completed
      res.status(200).json({
        message: "PlanCode updated successfully",
        success: true,
      });
    } else {
      // PlanCode not found or already used
      res.status(404).json({
        message: "PlanCode not found or already used.",
        success: false,
      });
    }
  } catch (err) {
    // General error handling
    console.error("Error in useCode:", err);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
