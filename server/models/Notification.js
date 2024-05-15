import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: false,
      },
      tr: {
        type: String,
        required: false,
      },
    },
    content: {
      en: {
        type: String,
        required: false,
      },
      tr: {
        type: String,
        required: false,
      },
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
    },
    send_to: {
      type: {
        type: String,
        enum: ["all", "plan", "user"],
        required: true,
      },
      value: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
