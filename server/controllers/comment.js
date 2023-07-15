import Comment from "../models/Comment.js";
import Restaurant from "../models/Restaurant.js"

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