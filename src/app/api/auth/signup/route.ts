import { connectDB } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "@/db/Models/UserModel";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const { username, email, password } = reqBody;

  try {
    await connectDB();

    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      return NextResponse.json(
        { message: "User already exists! Please login" },
        { status: 400 }
      );
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashedPassowrd,
    });

    const createdUser = await user.save();

    const userWithoutPassword = await UserModel.findById(
      createdUser._id
    ).select("-password");

    return NextResponse.json(
      { message: "User created Successfully!", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
