import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestaurantSchema = new mongoose.Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  menu: [
    {
      name: {
        type: String,
        required: true,
      },
      items: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          priceUnit: {
            type: String,
            required: true
          }
        },
      ],
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant