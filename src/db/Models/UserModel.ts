import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
    },

    city: {
      type: String,
    },

    adress: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema);
