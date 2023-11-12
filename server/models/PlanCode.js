import mongoose, { Schema } from "mongoose";

const PlanCodeSchema = new mongoose.Schema(
  {
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    duration_in_days: {
      type: Number,
      required: true,
      default: 30,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PlanCode = mongoose.model("PlanCode", PlanCodeSchema);
export default PlanCode;
