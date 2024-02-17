import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestaurantVisitSchema = new mongoose.Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  data: [
    {
      year: {
        type: String,
        required: true,
      },
      months: {
        type: [Number],
        required: true,
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    },
  ],
});

const RestaurantVisit = mongoose.model(
  "RestaurantVisit",
  RestaurantVisitSchema
);
export default RestaurantVisit;
