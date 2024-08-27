import { connectDB } from "@/db/dbConfig";
import { RestaurantModel } from "@/db/Models/RestaurantModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();

  try {
    await connectDB();

    const restaurantExist = await RestaurantModel.findOne({
      user: reqBody.userId,
    });

    if (restaurantExist) {
      return NextResponse.json("User already has a restaurant!", {
        status: 409,
      });
    }

    const restaurant = new RestaurantModel(reqBody);

    await restaurant.save();

    return NextResponse.json({ message: "Restaurant created", restaurant });
  } catch (error) {
    console.log(error);
    return NextResponse.json("SOMETHING WENT WRONG", {
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json("USER ID NOT FOUND!");
  }
  try {
    await connectDB();
    const restaurant = await RestaurantModel.findOne({ userId });
    if (!restaurant) {
      return NextResponse.json("No restaurant found for current user!", {
        status: 404,
      });
    }
    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("SOMETHING WENT WRONG", {
      status: 500,
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const reqBody = await request.json();

  try {
    await connectDB();
    const restaurant = await RestaurantModel.findOne({
      _id: reqBody._id,
    });

    if (!restaurant) {
      return NextResponse.json("Restauarant not found", { status: 404 });
    }

    restaurant.restaurantName = reqBody.restaurantName;
    restaurant.country = reqBody.country;
    restaurant.city = reqBody.city;
    restaurant.coverImg = reqBody.coverImg;
    restaurant.deliveryTime = reqBody.deliveryTime;
    restaurant.deliveryPrice = reqBody.deliveryPrice;
    restaurant.cuisines = reqBody.cuisines;
    restaurant.menuItems = reqBody.menuItems;
    restaurant.updatedAt = new Date();
    restaurant.createdAt = reqBody.createdAt;

    await restaurant.save();

    return NextResponse.json("Restaurant Updated 🎊");
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      "Something went wrong while updating restaurant!",
      { status: 500 },
    );
  }
};
