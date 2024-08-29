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

  return (
    <div className="min-h-screen px-4 py-10 md:p-10">
      <Tabs defaultValue="orders">
        <TabsList className="w-fit rounded-md bg-gray-100 p-1">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="flex items-center justify-center"
        >
          {orders?.length === 0 && !isGetOrdersLoading && (
            <div className="flex min-h-screen items-center justify-center">
              <h1 className="text-lg font-semibold">No active orders!</h1>
            </div>
          )}

          {isGetOrdersLoading ? (
            <Loader />
          ) : (
            <div className="my-5 w-full space-y-10 rounded-lg bg-gray-50 px-4 py-10 md:p-10">
              <h1 className="text-lg font-semibold">
                Active Orders : {orders?.length}
              </h1>
              {orders?.map((order) => (
                <OrderItemCard
                  key={order._id}
                  order={order}
                  userId={userId as string}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <div className="mx-auto flex min-h-screen justify-center">
            <ManageMyRestaurantForm
              restaurant={restaurant as RestaurantType}
              isGetRestaurantLoading={isGetRestaurantLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyRestaurantPage;
