import { connectDB } from "@/db/dbConfig";
import { OrderModel } from "@/db/Models/OrderModel";
import { RestaurantModel } from "@/db/Models/RestaurantModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const orderId = request.nextUrl.searchParams.get("orderId");
  const userId = request.nextUrl.searchParams.get("userId");

  const reqBody = await request.json();
  console.log(request);

  try {
    await connectDB();

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No order found!" },
        {
          status: 404,
        },
      );
    }

    const restaurant = await RestaurantModel.findById(order.restaurant);

    if (restaurant.userId.toString() !== userId) {
      console.log(userId, restaurant.userId.toString());
      return NextResponse.json(
        { success: false, message: "User  nit found!" },
        {
          status: 404,
        },
      );
    }

    order.status = reqBody.status;

    await order.save();

    return NextResponse.json(
      { success: true, message: "Order placed successfully!", order },
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
