import { connectDB } from "@/db/dbConfig";
import { OrderModel } from "@/db/Models/OrderModel";
import { RestaurantModel } from "@/db/Models/RestaurantModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const restaurantId = request.nextUrl.searchParams.get("restaurantId");

  try {
    await connectDB();

    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return NextResponse.json(
        {
          success: false,
          message: "Restaurant not found!",
        },
        { status: 404 },
      );
    }

    const orders = await OrderModel.find({ restaurant: restaurant._id })
      .populate("user")
      .populate("restaurant");

    return NextResponse.json(
      {
        success: true,
        message: "Orders for your restaurant found!",
        orders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      "Something went wrong while getting orders of your restaurant!",
      { status: 500 },
    );
  }
};
