/*SAVE USER AVATAR */

import Restaurant from "../models/Restaurant.js";
import UserAvatar from "../models/UserAvatar.js";

export const saveUserAvatar = async (req, res) => {
  console.log("xxxxxxxx", req);
  try {
    const { user_id } = req.body;
    const file = req.file.buffer;

    // Check if a user avatar with the user_id already exists
    const existingUserAvatar = await UserAvatar.findOne({ user_id });

    if (existingUserAvatar) {
      // Update the existing user avatar
      existingUserAvatar.file = file;
      await existingUserAvatar.save();
    } else {
      // Create a new user avatar
      const newUserAvatar = new UserAvatar({
        user_id,
        file,
      });

      // Save the new user avatar to the database
      await newUserAvatar.save();
    }

    res.status(201).json({ message: "User avatar uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload user avatar." });
  }
};

/*READ USER AVATAR*/

export const getUserAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the userAvatar based on the user_id
    const userAvatar = await UserAvatar.findOne({ user_id });

    if (!userAvatar) {
      return res.status(404).json({ message: "UserAvatar not found." });
    }

    // Send the userAvatar file as a response
    res.setHeader("Content-Type", "image/*");
    res.send(userAvatar.file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve userAvatar." });
  }
};

/*READ USER AVATAR BY RESTAURANT ID*/

export const getUserAvatarByRestaurantId = async (req, res) => {
  try {
    const { restaurant_id } = req.params;

    const restaurant = await Restaurant.findById(restaurant_id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Find the userAvatar based on the user_id
    const userAvatar = await UserAvatar.findOne({
      user_id: restaurant?.user_id,
    });

    if (!userAvatar) {
      return res.status(404).json({ message: "UserAvatar not found." });
    }

    // Send the userAvatar file as a response
    res.setHeader("Content-Type", "image/*");
    res.send(userAvatar.file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve userAvatar." });
  }
};
