import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rate: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
