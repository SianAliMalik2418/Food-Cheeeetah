"use client";

import { RestaurantSchemaType } from "@/schemas/RestaurantSchema";
import {
  OrderStatusApiResponseType,
  OrderStatusType,
  RestaurantType,
} from "@/types/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useCreateMyRestaurant = () => {
  const { data: session } = useSession();

  const createMyRestaurantRequest = async (
    data: RestaurantSchemaType,
  ): Promise<RestaurantType> => {
    const payLoad = { ...data, userId: session?.user.id };

    try {
      const response = await axios.post(`/api/my-restaurant`, payLoad);
      return response?.data?.restaurant;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    mutateAsync: createMyRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createMyRestaurant, isLoading };
};

export const useGetMyRestaurant = () => {
  const { data: session } = useSession();

  const getMyRestaurantRequest = async (): Promise<RestaurantType> => {
    try {
      const response = await axios(
        `/api/my-restaurant?userId=${session?.user.id}`,
      );
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest,
    {
      enabled: !!session?.user.id,
    },
  );

  return { restaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const updateMyRestaurantRequest = async (
    data: RestaurantType,
  ): Promise<RestaurantType> => {
    const payLoad = { ...data };

    try {
      const response = await axios.put(`/api/my-restaurant`, payLoad);
      console.log(response);
      return response?.data?.restaurant;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    mutateAsync: updateMyRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateMyRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = (restaurantId: string) => {
  const getMyRestaurantOrdersRequest = async (): Promise<
    OrderStatusApiResponseType[]
  > => {
    try {
      const response = await axios(
        `/api/my-restaurant/order?restaurantId=${restaurantId}`,
      );
      console.log(response);

      return response.data.orders;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest,
    {
      enabled: !!restaurantId,
    },
  );

  return { orders, isLoading };
};

type updateMyRestaurantOrderRequestType = {
  orderId: string;
  userId: string;
  orderStatus: OrderStatusType;
};

export const useUpdateMyRestaurantOrderStatus = () => {
  const updateMyRestaurantOrderRequest = async ({
    orderId,
    userId,
    orderStatus,
  }: updateMyRestaurantOrderRequestType) => {
    try {
      const response = await axios.put(
        `/api/my-restaurant/order/status?orderId=${orderId}&userId=${userId}`,
        { status: orderStatus },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const {
    mutateAsync: changeOrderStatus,
    isLoading,
    isError,
    reset,
    isSuccess,
  } = useMutation(["updateOrderStatus"], updateMyRestaurantOrderRequest);

  if (isSuccess) {
    toast.success("Order status updated!");
  }

  if (isError) {
    toast.error("Error while changing order status.");
    reset();
  }

  return { changeOrderStatus, isLoading };
};
