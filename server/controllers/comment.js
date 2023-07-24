import Comment from "../models/Comment.js";
import Restaurant from "../models/Restaurant.js"
import User from "../models/User.js";

//GET COMMENTS

export const getComments = async (req, res) => {
    console.log("req.params", req.params);
    try {
        let comments = await Comment.find({ user_id: req.params.id });

        for (let i = 0; i < comments.length; i++) {
            let restaurant = await Restaurant.findOne({ _id: comments[i].restaurant_id });
            console.log("rest", comments[i]);
            comments[i] = { ...comments[i]._doc, restaurant: restaurant || null };
        }

        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting comments');
    }
};

// DELETE COMMENT

export const deleteComment = async (req, res) => {
  console.log("ibrahimmm", req.params.id)
  try {
    Comment.findByIdAndDelete(req.params.id).then((updatedUser) => {
      // Successfully removed the deleted restaurant's ObjectId from the user's restaurants field
      res.status(200).json({ success: true }); // Send success response to client
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to delete branch' }); // Send error response to client
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' }); // Send error response to client
  }
}

// ADD COMMENT

export const addComment = async (req, res) => {
  console.log("pppppppppppp", req.params)
  try {
    const { restaurantId } = req.params; // Retrieve the restaurant ID from the request parameters
    const { rate, comment } = req.body; // Retrieve the rate and comment from the request body

    if (!restaurantId) {
      return res.status(400).json({ error: 'Missing restaurantId in the request.' });
    }

    const restaurant = await Restaurant.findById( restaurantId );

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    const newComment = new Comment({
      rate,
      comment,
      user_id: restaurant?.user_id,
      restaurant_id: restaurantId
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: 'An error occurred while adding the comment.' });
  }
}

