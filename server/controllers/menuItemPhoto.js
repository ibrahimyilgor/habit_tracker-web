import MenuItemPhoto from "../models/MenuItemPhoto.js";

/*SAVE MENU ITEM PHOTO */

export const saveMenuItemPhoto = async (req, res) => {
  try {
    const { menu_item_id, user_id } = req.body;
    const file = req.file.buffer;

    // Check if a menu item photo with the menu_item_id already exists
    const existingMenuItemPhoto = await MenuItemPhoto.findOne({ menu_item_id });

    if (existingMenuItemPhoto) {
      // Update the existing menu item photo
      existingMenuItemPhoto.file = file;
      await existingMenuItemPhoto.save();
    } else {
      // Create a new menu item photo
      const newMenuItemPhoto = new MenuItemPhoto({
        user_id,
        menu_item_id,
        file,
      });

      // Save the new menu item photo to the database
      await newMenuItemPhoto.save();
    }

    res.status(201).json({ message: "Menu item photo uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload menu item photo." });
  }
};

/*READ MENU ITEM PHOTO*/

export const getMenuItemPhoto = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    console.log("error1", menuItemId);
    // Find the MenuItemPhoto based on the menuItemId
    const itemPhoto = await MenuItemPhoto.findOne({
      menu_item_id: menuItemId.toString(),
    });

    if (!itemPhoto) {
      console.log("error1");
      return res.status(404).json({ message: "MenuItemPhoto not found." });
    }

    // Send the MenuItemPhoto file as a response
    res.setHeader("Content-Type", "image/*");
    res.send(itemPhoto.file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve MenuItemPhoto." });
  }
};
