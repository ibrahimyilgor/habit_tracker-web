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
  isPdf: {
    type: Boolean,
    default: false
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
          },
          explanation: {
            type: String,
            required: false
          }
        },
      ],
    },
  ],
  settings: {
    showLogo: {
      type: Boolean,
      default: true,
    },
    showComment: {
      type: Boolean,
      default: true,
    },
  },
  colors: {
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    itemColor: {
      type: String,
      default: '#eeeeee',
    },
    textColor: {
      type: String,
      default: '#000000',
    },
  }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant