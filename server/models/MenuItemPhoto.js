import mongoose, { Schema } from "mongoose";

const MenuItemPhotoSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  menu_item_id: {
    type: String,
    required: true,
  },
  file: {
    type: Buffer,
    required: true,
  },
});

const MenuItemPhoto = mongoose.model("MenuItemPhoto", MenuItemPhotoSchema);
export default MenuItemPhoto;
