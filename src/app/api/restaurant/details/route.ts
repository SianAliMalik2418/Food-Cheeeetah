import { connectDB } from "@/db/dbConfig";
import { RestaurantModel } from "@/db/Models/RestaurantModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const restaurantId = request.nextUrl.searchParams.get("restaurantId");

  try {
    await connectDB();

    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Restaurant found", restaurant },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
