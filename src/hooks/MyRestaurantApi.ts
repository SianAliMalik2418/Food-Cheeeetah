"use client";

import { RestaurantSchemaType } from "@/schemas/RestaurantSchema";
import { RestaurantType } from "@/types/types";
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
      console.log(response);
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
