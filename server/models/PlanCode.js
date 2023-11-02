import mongoose, { Schema } from "mongoose";

const PlanCodeSchema = new mongoose.Schema(
  {
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    valid_date: {
      type: Date,
      required: true,
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
