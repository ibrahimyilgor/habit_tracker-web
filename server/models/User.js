import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    plan_expiration_date: {
      type: Date,
      required: true,
      default: new Date("9999-12-12"),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
