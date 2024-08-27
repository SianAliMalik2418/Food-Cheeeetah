"use client";

import { Form } from "@/components/ui/form";
import {
  RestaurantSchema,
  RestaurantSchemaType,
} from "@/schemas/RestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/hooks/MyRestaurantApi";
import ButtonLoading from "@/components/ui/ButtonLoading";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Loader from "@/components/ui/Loader";

function ManageMyRestaurantForm() {
  const { data: session, status } = useSession();

  // Importing stuff from custom hooks.
  const { createMyRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();
  const { restaurant, isLoading: isGetRestaurantLoading } =
    useGetMyRestaurant();

  const { updateMyRestaurant, isLoading: isUpdatingRestaurantLoading } =
    useUpdateMyRestaurant();

  // Checking if the user is about to update the restaurant or not,
  const isEditingRestaurant = !!restaurant;

  const form = useForm<RestaurantSchemaType>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          menuItemName: "",
          menuItemPrice: 100,
        },
      ],
    },
  });

  // Submitting form
  const handleCreateRestaurant = (restaurantData: RestaurantSchemaType) => {
    isEditingRestaurant
      ? updateMyRestaurant({
          ...restaurantData,
          _id: restaurant._id,
          userId: restaurant.userId,
        })
      : createMyRestaurant(restaurantData);
  };

  // Checking if the user has restaurant or not.
  useEffect(() => {
    if (!restaurant) {
      return;
    }

    form.reset(restaurant);
  }, [form, restaurant, isGetRestaurantLoading]);

  if (isGetRestaurantLoading || status === "loading") {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        className="my-5 w-[90%] space-y-10 rounded-lg bg-gray-50 px-4 py-10 md:p-10"
        onSubmit={form.handleSubmit(handleCreateRestaurant)}
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        <ButtonLoading
          isLoading={isCreateRestaurantLoading || isUpdatingRestaurantLoading}
          className="w-full"
          type="submit"
        >
          Submit
        </ButtonLoading>
      </form>
    </Form>
  );
}

export default ManageMyRestaurantForm;
