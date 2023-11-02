import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: [
    {
      language: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  description: [
    {
      language: {
        type: String,
        required: true,
      },
      text: {
        type: Array,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
