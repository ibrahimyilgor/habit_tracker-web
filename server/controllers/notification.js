import Notification from "../models/Notification.js";

//GET ALL NOTIFICATIONS

export const getAllNotifications = async (req, res) => {
  let notifications = await Notification.find().lean();
  try {
    res.status(200).json(notifications);
  } catch (error) {
    throw new Error("Error while getting notifications");
  }
};

// ADD NOTIFICATION

export const addNotification = async (req, res) => {
  try {
    const { title, content, sender_id, send_to, send_to_id, duration } =
      req.body;

    const newNotification = new Notification({
      title,
      content,
      sender_id: sender_id,
      send_to: {
        type: send_to,
        value: send_to_id,
      },
      duration,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the notification." });
  }
};

// DELETE NOTIFICATION

export const deleteNotification = async (req, res) => {
  try {
    Notification.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        // Handle error
        res
          .status(500)
          .json({ success: false, error: "Failed to delete notification" });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

/*UPDATE NOTIFICATION*/

export const updateNotification = async (req, res) => {
  try {
    const { title, content, sender_id, send_to, send_to_id, duration } =
      req.body;
    await Notification.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title,
          content,
          sender_id: sender_id,
          send_to: {
            type: send_to,
            value: send_to_id,
          },
          duration,
        },
      }
    );
    res
      .status(200)
      .json({ success: true, message: "Notification updated successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/*GET NOTIFICATION FOR A USER*/

export const getNotificationsForAUser = async (req, res) => {
  const { user_id, plan_id } = req.params;
  let notifications = await Notification.find().lean();

  let returnNotifications = [];

  notifications.forEach((notif) => {
    if (notif?.send_to?.type === "all") {
      returnNotifications.push(notif);
    } else if (notif?.send_to?.type === "plan") {
      if (notif?.send_to?.value === plan_id) {
        returnNotifications.push(notif);
      }
    } else if (notif?.send_to?.type === "user") {
      if (notif?.send_to?.value === user_id) {
        returnNotifications.push(notif);
      }
    }
  });

  try {
    res.status(200).json(returnNotifications);
  } catch (error) {
    throw new Error("Error while getting notifications");
  }
};
