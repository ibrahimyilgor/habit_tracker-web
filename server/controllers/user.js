import User from "../models/User.js"

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
