import Restaurant from "../models/Restaurant.js"
import User from "../models/User.js"

/*READ RESTAURANT*/

export const getBranches = async (req, res) => {
    console.log("req.params",req.params)
    try {
        const branches = await Restaurant.find({ user_id: req.params.id })
        console.log("req.params2",branches)
        res.status(200).json(branches)
      } catch (error) {
        console.log(error);
        throw new Error('Error while getting restaurant by user id');
      }
}

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
