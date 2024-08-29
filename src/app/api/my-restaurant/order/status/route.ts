import { connectDB } from "@/db/dbConfig";
import { OrderModel } from "@/db/Models/OrderModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const orderId = request.nextUrl.searchParams.get("orderId");
  const userId = request.nextUrl.searchParams.get("userId");

  const { status } = await request.json();

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

    if (order.restaurant.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "User  nit found!" },
        {
          status: 404,
        },
      );
    }

    order.status = status;

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
