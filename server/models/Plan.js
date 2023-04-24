import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan