import { connectDB } from "@/db/dbConfig";
import { RestaurantModel } from "@/db/Models/RestaurantModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { city: string } },
) => {
  try {
    await connectDB();

    const city = params.city || "";
    const sortOption =
      request.nextUrl.searchParams.get("sortOption") || "lastUpdated";
    const searchQuery = request.nextUrl.searchParams.get("searchQuery") || "";
    const selectedCuisines =
      request.nextUrl.searchParams.get("selectedCuisines") || "";
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const query: any = {};

    // Filter by city if provided
    query["city"] = new RegExp(city, "i");
    const cityCheck = await RestaurantModel.countDocuments(query);
    if (cityCheck === 0) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          pagination: {
            page: 1,
            totalDocuments: 0,
            pages: 1,
          },
        },
        { status: 404 },
      );
    }

    // Filter by searchQuery if provided
    if (searchQuery) {
      const searchQueryRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchQueryRegex },
        { cuisines: { $in: [searchQueryRegex] } },
      ];
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    // Fetch restaurants with pagination and sorting
    const restaurant = await RestaurantModel.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Get total number of documents for pagination
    const totalDocuments = await RestaurantModel.countDocuments(query);

    // If no restaurants found, return an error response
    if (totalDocuments === 0) {
      return NextResponse.json(
        { success: false, message: "No restaurants found!" },
        { status: 404 },
      );
    }

    // Return the successful response with restaurant data and pagination
    const response = {
      success: true,
      data: restaurant,
      pagination: {
        page,
        totalDocuments,
        pages: Math.ceil(totalDocuments / pageSize),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
