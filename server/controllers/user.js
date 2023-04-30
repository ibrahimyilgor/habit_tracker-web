import User from "../models/User.js"
import Restaurant from "../models/Restaurant.js"

/*READ USER*/

export const getUser = async (req, res) => {
    console.log("idd", req.params)
    try{
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
        console.log("idd2", user, id)
    }
    catch (err){
        res.status(404).json({error: err.message});
    }
}

/*UPDATE USER*/


export const updateUser = async (req, res) => {
    try{
        const { _id, name, address, phone } = req.body
        await User.updateOne({_id: _id}, {$set: {name: name, address: address, phone: phone}})
        res.status(200).json({ message: "Account updated successfully." })
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}

/*DELETE USER*/

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        await Restaurant.deleteMany({ user_id: req.params.id });

        res.status(200).json({ success: true, message: `Deleted user ${deletedUser.name} and all their branches.` });
        console.log("ssccccssss");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting user.', error: error });    }
  }