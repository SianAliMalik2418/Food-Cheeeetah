import { connectDB } from "@/db/dbConfig";
import { OrderModel } from "@/db/Models/OrderModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const restaurant = request.nextUrl.searchParams.get("restaurant");
  const user = request.nextUrl.searchParams.get("user");

  const reqBody = await request.json();

  try {
    await connectDB();

    // Destructure the fields from reqBody
    const { deliveryDetails, cartItems, status, totalAmount } = reqBody;

    const newOrder = new OrderModel({
      restaurant,
      user,
      deliveryDetails,
      cartItems,
      status,
      totalAmount,
    });

    await newOrder.save();

    return NextResponse.json(
      { success: true, message: "Order placed successfully!", newOrder },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong while placing order!", {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId");

  try {
    await connectDB();

    const orders = await OrderModel.find({ user: userId })
      .populate("restaurant")
      .populate("user");

    return NextResponse.json(
      {
        success: true,
        message: "Orders for current user fetched successfully!",
        orders,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong while getting orders!", {
      status: 500,
    });
  }
};
