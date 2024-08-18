import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  menuItemName: {
    type: String,
    required: [true, "Menu Item Name is Required!"],
  },
  menuItemPrice: {
    type: Number,
    required: [true, "Menu Item Price is Required!"],
  },
});

const restaurantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User ID is Required!"],
  },

  restaurantName: {
    type: String,
    required: [true, "Restaurant Name is Required!"],
  },
  country: {
    type: String,
    required: [true, "Country is Required!"],
  },
  city: {
    type: String,
    required: [true, "City is Required!"],
  },

  coverImage: {
    type: String,
    required: [true, "Cover Image Url is Required!"],
  },

  estimatedDeliveryTime: {
    type: Number,
    required: [true, "Delivery Time is Required!"],
  },

  deliveryPrice: {
    type: Number,
    required: [true, "Delivery Price is Required!"],
  },

  cuisines: [
    {
      type: String,
      required: [true, "Cuisines are Required!"],
    },
  ],

  menuItems: [menuItemSchema],
});

export const RestaurantModel =
  mongoose.models.restaurants ||
  mongoose.model("restaurants", restaurantSchema);
