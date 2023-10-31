import PlanCode from "../models/PlanCode.js";
import User from "../models/User.js";

//USE CODE

export const useCode = async (req, res) => {
    try{
        const { plan_id, user_id, code } = req.body
        // Find a PlanCode that matches the provided plan_id and code
        const planCode = await PlanCode.findOne({
            plan_id: plan_id,
            code: code,
            valid_date: { $gte: new Date() }, // Check for validity
        });
    
        if (planCode) {
            await PlanCode.findByIdAndDelete(planCode._id);

            await User.updateOne({_id: user_id}, {$set: {plan_id: plan_id}})
            
            res.status(200).json({ message: "PlanCode updated successfully", success: true });
        } else {
            res.status(404).json({ message: "PlanCode not found or already used.", success: false });
        }
    }
    catch (err){
        res.status(500).json({ error: err.message, success: false });
    }
};
