import mongoose, { Schema } from "mongoose";

const ResetPasswordSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const ResetPassword = mongoose.model("ResetPassword", ResetPasswordSchema);
export default ResetPassword;
