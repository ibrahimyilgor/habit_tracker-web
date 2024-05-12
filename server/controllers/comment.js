import Comment from "../models/Comment.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

//GET COMMENTS

export const getComments = async (req, res) => {
  try {
    let comments = await Comment.find({ user_id: req.params.id });

    for (let i = 0; i < comments.length; i++) {
      let restaurant = await Restaurant.findOne({
        _id: comments[i].restaurant_id,
      });
      comments[i] = { ...comments[i]._doc, restaurant: restaurant || null };
    }

    res.status(200).json(comments);
  } catch (error) {
    throw new Error("Error while getting comments");
  }
};

// DELETE COMMENT

export const deleteComment = async (req, res) => {
  try {
    Comment.findByIdAndDelete(req.params.id)
      .then((updatedUser) => {
        // Successfully removed the deleted restaurant's ObjectId from the user's restaurants field
        res.status(200).json({ success: true }); // Send success response to client
      })
      .catch((err) => {
        // Handle error
        res
          .status(500)
          .json({ success: false, error: "Failed to delete branch" }); // Send error response to client
      });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" }); // Send error response to client
  }
};

// ADD COMMENT

export const addComment = async (req, res) => {
  try {
    const { restaurantId } = req.params; // Retrieve the restaurant ID from the request parameters
    const { rate, comment } = req.body; // Retrieve the rate and comment from the request body

    if (!restaurantId) {
      return res
        .status(400)
        .json({ error: "Missing restaurantId in the request." });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    const newComment = new Comment({
      rate,
      comment,
      user_id: restaurant?.user_id,
      restaurant_id: restaurantId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment." });
  }
};

//GET AVERAGE RATE OF COMMENTS

export const getAverageRateOfCommentsInLast30Days = async (req, res) => {
  try {
    const today = new Date(); // Get the current date
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30); // Subtract 30 days

    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(today.getDate() - 60); // Subtract 60 days

    let comments30 = await Comment.find({
      user_id: req.params.id,
      createdAt: { $gte: thirtyDaysAgo }, // Filter by createdAt date within the last 30 days
    });

    let average30 = 0;

    if (comments30.length !== 0) {
      const numbers = comments30.map((comment) => comment.rate);
      const sum = numbers.reduce((total, num) => total + num, 0); // Calculate the sum
      average30 = sum / numbers.length; // Calculate the average
    }

    let comments60 = await Comment.find({
      user_id: req.params.id,
      createdAt: { $lte: thirtyDaysAgo },
      createdAt: { $gte: sixtyDaysAgo },
    });

    let average60 = 0;

    if (comments60.length !== 0) {
      const numbers = comments60.map((comment) => comment.rate);
      const sum = numbers.reduce((total, num) => total + num, 0); // Calculate the sum
      average60 = sum / numbers.length; // Calculate the average
    }

    res.status(200).json({ average30, average60 });
  } catch (error) {
    throw new Error("Error while getting average rate of comments");
  }
};
