import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    deliveryDetails: {
      email: { type: String, required: [true, "email is required"] },
      username: { type: String, required: [true, "username is required"] },
      addressLine1: {
        type: String,
        required: [true, "addressLine1 is required"],
      },
      city: { type: String, required: [true, "city is required"] },
    },
    cartItems: [
      {
        _id: {
          type: String,
          required: [true, "menuItemId is required"],
        },
        quantity: { type: Number, required: [true, "quantity is required"] },
        menuItemName: {
          type: String,
          required: [true, "menuItemname is required"],
        },
        menuItemPrice: {
          type: String,
          required: [true, "menuItemPrice is required"],
        },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
    },
  },
  { timestamps: true },
);

export const OrderModel =
  mongoose.models.orders || mongoose.model("orders", orderSchema);
