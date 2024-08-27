import { connectDB } from "@/db/dbConfig";
import { UserModel } from "@/db/Models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params;
  const reqBody = await req.json();
  const { username, city, country, addressLine1 } = reqBody;

  try {
    await connectDB();

    const updatedUser = await UserModel.findById(userId);

    updatedUser.username = username;
    updatedUser.city = city;
    updatedUser.country = country;
    updatedUser.addressLine1 = addressLine1;

    await updatedUser.save();

    return NextResponse.json(
      { message: "Profile Updated!", updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong!");
  }
};
