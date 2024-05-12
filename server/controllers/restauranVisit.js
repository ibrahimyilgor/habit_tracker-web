import RestaurantVisit from "../models/RestaurantVisit.js";
import User from "../models/User.js";
import { sumArrays } from "../utils/concatVisitMonth.js";

/*READ VISIT*/

export const getRestaurantVisit = async (req, res) => {
  try {
    const { restaurant_ids } = req.params;
    let visit;
    visit = await RestaurantVisit.find({
      restaurant_id: { $in: [restaurant_ids] },
    });
    res.status(200).json(visit);
  } catch (error) {
    throw new Error("Error while getting restaurant visit");
  }
};

export const getAllRestaurantVisitForAUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    let visits;
    const user = await User.findById(user_id);
    const restaurantIds = user.restaurants.map((r) => r?._id);
    const visitsPromises = restaurantIds.map((restaurantId) =>
      RestaurantVisit.find({ restaurant_id: restaurantId })
    );
    const restaurantVisitsArrays = await Promise.all(visitsPromises);

    // Concatenate all the arrays into a single array
    visits = restaurantVisitsArrays.reduce((acc, curr) => acc.concat(curr), []);

    let totalData = [
      {
        data: [],
      },
    ];

    Array.isArray(visits) &&
      visits.forEach((visit) => {
        Array.isArray(visit?.data) &&
          visit?.data.forEach((visitData) => {
            let hasYear = totalData[0].data.some(
              (item) => item.year == visitData.year
            );
            if (hasYear) {
              totalData[0].data.filter(
                (td) => td.year == visitData.year
              )[0].months = sumArrays(
                totalData[0].data.filter((td) => td.year == visitData.year)[0]
                  .months,
                visitData.months
              );
              totalData[0].data.filter(
                (td) => td.year == visitData.year
              )[0].tablet += visitData.tablet;
              totalData[0].data.filter(
                (td) => td.year == visitData.year
              )[0].phone += visitData.phone;
              totalData[0].data.filter(
                (td) => td.year == visitData.year
              )[0].desktop += visitData.desktop;
            } else {
              totalData[0].data.push(visitData);
            }
          });
      });
    res.status(200).json(totalData);
  } catch (error) {
    throw new Error("Error while getting restaurant visit");
  }
};
