"use client";

import OrderItemCard from "@/components/OrderStatusPage/OrderItemCard";
import Loader from "@/components/ui/Loader";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ManageMyRestaurantForm from "@/forms/manage-my-restaurant-form/ManageMyRestaurantForm";
import {
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
} from "@/hooks/MyRestaurantApi";
import { RestaurantType } from "@/types/types";
import { TabsList } from "@radix-ui/react-tabs";
import { useSession } from "next-auth/react";
import React from "react";

function MyRestaurantPage() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { restaurant, isLoading: isGetRestaurantLoading } =
    useGetMyRestaurant();

  const { orders, isLoading: isGetOrdersLoading } = useGetMyRestaurantOrders(
    restaurant?._id as string,
  );

  const activeOrders = orders?.filter((order) => order.status !== "delivered");

  return (
    <div className="min-h-screen px-4 py-10 md:p-10">
      <Tabs defaultValue="manage-restaurant">
        <TabsList className="w-fit rounded-md bg-gray-100 p-1">
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="manage-restaurant">
          <div className="mx-auto flex min-h-screen justify-center">
            <ManageMyRestaurantForm
              restaurant={restaurant as RestaurantType}
              isGetRestaurantLoading={isGetRestaurantLoading}
            />
          </div>
        </TabsContent>
        <TabsContent
          value="orders"
          className="flex-col items-center justify-center"
        >
          {isGetOrdersLoading && <Loader />}
          {activeOrders?.length === 0 && !isGetOrdersLoading && (
            <div className="flex items-center justify-center px-3 py-5 md:px-20 md:py-10">
              <h1 className="text-lg font-bold"> No active orders found!</h1>
            </div>
          )}

          <div className="my-5 w-full space-y-10 rounded-lg bg-gray-50 px-4 py-10 md:p-10">
            <h1 className="text-lg font-semibold">
              Active orders : {activeOrders?.length}
            </h1>
            {activeOrders?.map((order) => (
              <OrderItemCard
                key={order._id}
                order={order}
                userId={userId as string}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyRestaurantPage;
