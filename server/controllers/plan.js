import Plan from "../models/Plan.js";

//GET PLAN

export const getPlan = async (req, res) => {
  try {
    const plans = await Plan.find();

    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'Plans not found.' });
    }
    
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve plans.' });
  }
};
