"use client";

import OrderStatusCard from "@/components/OrderStatusPage/OrderStatusCard";
import Loader from "@/components/ui/Loader";
import { useGetMyOrders } from "@/hooks/OrderApi";
import { useSession } from "next-auth/react";

const OrderStatusPage = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { orders, isLoading } = useGetMyOrders(userId as string);

  if (isLoading) {
    return <Loader />;
  }

  if ((!orders || orders?.length === 0) && !isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-3 py-5 md:px-20 md:py-10">
        <h1 className="text-lg font-bold"> No orders found!</h1>
      </div>
    );
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
