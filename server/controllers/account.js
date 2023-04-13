import User from "../models/User.js"

/*READ USER*/

export const getAccount = async (req, res) => {
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