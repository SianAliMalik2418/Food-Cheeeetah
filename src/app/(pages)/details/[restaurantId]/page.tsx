"use client";

import CheckoutButton from "@/components/Details/CheckoutButton";
import MenuItem from "@/components/Details/MenuItem";
import OrderSummary from "@/components/Details/OrderSummary";
import RestaurantInfo from "@/components/Details/RestaurantInfo";
import DetailsPageSkeleton from "@/components/Skeletons/DetailsPageSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { usePlaceOrder } from "@/hooks/OrderApi";
import { useGetSingleRestaurant } from "@/hooks/RestaurantApi";
import { UserProfileSchemaType } from "@/schemas/UserProfileSchema";
import { MenuItemType, OrderDetailsType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export type CartItemType = {
  _id?: string;
  menuItemName: string;
  menuItemPrice: number;
  quantity: number;
};

const RestaurantDetailPage = ({
  params,
}: {
  params: { restaurantId: string };
}) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const restaurantId = params.restaurantId;

  const { restaurant, isLoading } = useGetSingleRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCartItemsInSessionStorage = sessionStorage.getItem(
      `cartItems-${restaurantId}`,
    );
    return storedCartItemsInSessionStorage
      ? JSON.parse(storedCartItemsInSessionStorage)
      : [];
  });

  const { isLoading: isPlacingOrderLoading, placeOrder } = usePlaceOrder();

  // Cart functionality.
  const handleAddToCart = (menuItem: MenuItemType) => {
    setCartItems((prev) => {
      //  1. Check if clicked item is already in the cart
      const existingMenuItemInCart = prev.filter(
        (cartItem) => cartItem._id === menuItem._id,
      );

      let updatedCartItems;

      //  2. If it is already in the cart update the quantity.
      if (existingMenuItemInCart.length !== 0) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      //  3. Item is not in the cart, add it for the first time.
      else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            menuItemName: menuItem.menuItemName,
            menuItemPrice: menuItem.menuItemPrice,
            quantity: 1,
          },
        ];
      }

      toast.success("Added to cart");

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const handleDeleteButtonCart = (cartItem: CartItemType) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter(
        (prevCartItem) => prevCartItem._id !== cartItem._id,
      );

      toast.warning(`${cartItem.menuItemName} removed from cart`);

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const handleRemoveFromCart = (menuItem: MenuItemType) => {
    setCartItems((prev) => {
      let updatedCartItems;

      updatedCartItems = prev.map((prevCartItem) =>
        prevCartItem._id === menuItem._id && prevCartItem.quantity > 0
          ? {
              ...prevCartItem,
              quantity: prevCartItem.quantity - 1,
            }
          : prevCartItem,
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return <DetailsPageSkeleton />;
  }

  if (!restaurant && !isLoading) {
    return "Something went wrong while trying to fetch details of restaurant. Please try again later!";
  }

  const getTotalCost = () => {
    const totalPriceOfMenuItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.menuItemPrice * cartItem.quantity,
      0,
    );

    const totalPriceOfMenuItemsWithDeliveryPrice =
      totalPriceOfMenuItems + restaurant.deliveryPrice;

    return totalPriceOfMenuItemsWithDeliveryPrice;
  };

  const handleCheckOut = (data: UserProfileSchemaType) => {
    const orderDetails: OrderDetailsType = {
      restaurant: restaurant?._id,
      user: userId as string,
      deliveryDetails: {
        email: data.email as string,
        username: data.username,
        addressLine1: data.addressLine1,
        city: restaurant.city,
      },
      cartItems: cartItems,
      status: "placed",
      totalAmount: getTotalCost(),
    };

    placeOrder(orderDetails);
  };

  return (
    <div className="flex flex-col gap-10 p-5">
      <AspectRatio ratio={16 / 5}>
        <Image
          fill
          src={restaurant.coverImage}
          className="rounded-lg object-cover object-center"
          alt="Cover Image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </AspectRatio>
      <div className="grid gap-5 md:grid-cols-[4fr_2.5fr] md:px-14 lg:px-28">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="mt-5 text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => handleAddToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card className="sticky top-32">
            <OrderSummary
              cartItems={cartItems}
              restaurant={restaurant}
              handleDeleteButtonCart={handleDeleteButtonCart}
              addToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              getTotalCost={getTotalCost}
            />

            <CardFooter>
              <CheckoutButton
                handleCheckOut={handleCheckOut}
                disabled={cartItems.length === 0}
                isPlacingOrderLoading={isPlacingOrderLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
