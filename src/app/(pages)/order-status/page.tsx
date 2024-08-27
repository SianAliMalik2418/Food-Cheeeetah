"use client";

import OrderStatusCard from "@/components/OrderStatusPage/OrderStatusCard";
import { useGetMyOrders } from "@/hooks/OrderApi";
import { useSession } from "next-auth/react";

const OrderStatusPage = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { orders, isLoading } = useGetMyOrders(userId as string);

  if (isLoading) {
    return "Loading...";
  }

  if ((!orders || orders?.length === 0) && !isLoading) {
    return "No orders found!";
  }

  return (
    <div className="min-h-screen px-3 py-5 md:px-20 md:py-10">
      {orders?.map((order) => (
        <OrderStatusCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderStatusPage;
