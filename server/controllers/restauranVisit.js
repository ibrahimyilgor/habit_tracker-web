import RestaurantVisit from "../models/RestaurantVisit.js";

/*READ VISIT*/

export const getRestaurantVisit = async (req, res) => {
  console.log("req.params", req.params);
  try {
    const { restaurant_ids } = req.params;
    let visit;
    visit = await RestaurantVisit.find({
      restaurant_id: { $in: [restaurant_ids] },
    });
    console.log("VISITVISITVISIT", visit);
    res.status(200).json(visit);
  } catch (error) {
    console.log(error);
    throw new Error("Error while getting restaurant visit");
  }
};
