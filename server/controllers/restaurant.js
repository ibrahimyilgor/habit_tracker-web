import Restaurant from "../models/Restaurant.js"
import User from "../models/User.js"

/*READ BRANCHES*/

export const getBranches = async (req, res) => {
  console.log("req.params",req.params)
  try {
      let branches;
      branches = await Restaurant.find({ user_id: req.params.id });
      res.status(200).json(branches)
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting restaurant by user id');
    }
}

/*ADD BRANCH*/

export const addBranch = async (req, res) => {
  console.log("ibrahim", req.body)
  try {
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newRestaurant = new Restaurant({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          user_id: user._id
      });
  
      user.restaurants.push(newRestaurant);
      await user.save();
      await newRestaurant.save();
  
      return res.status(201).json({ message: 'Restaurant added to user', restaurant: newRestaurant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

/*DELETE BRANCH*/

export const deleteBranch = async (req, res) => {
  console.log("ibrahimmm", req.params.id)
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }
    res.send({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

/*UPDATE BRANCH*/

export const updateBranch = async (req, res) => {
  try{
      const { _id, name, address, phone } = req.body
      await Restaurant.updateOne({_id: _id}, {$set: {name: name, address: address, phone: phone}})
      res.status(200).json({ message: "Branch updated successfully." })
  }
  catch (err){
      res.status(500).json({ error: err.message });
  }
}
