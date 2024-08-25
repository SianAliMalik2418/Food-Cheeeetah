import { CartItemType } from "@/app/(pages)/details/[restaurantId]/page";
import { MenuItemType, RestaurantType } from "@/types/types";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { CircleMinus, CirclePlus, Trash } from "lucide-react";

type OrderSummaryProps = {
  cartItems: CartItemType[];
  restaurant: RestaurantType;
  handleDeleteButtonCart: (cartItem: CartItemType) => void;
  addToCart: (menuItem: MenuItemType) => void;
  handleRemoveFromCart: (menuItem: MenuItemType) => void;
};

const OrderSummary = ({
  cartItems,
  restaurant,
  handleDeleteButtonCart,
  addToCart,
  handleRemoveFromCart,
}: OrderSummaryProps) => {
  const getTotalCost = () => {
    const totalPriceOfMenuItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.menuItemPrice * cartItem.quantity,
      0,
    );

    const totalPriceOfMenuItemsWithDeliveryPrice =
      totalPriceOfMenuItems + restaurant.deliveryPrice;

    return totalPriceOfMenuItemsWithDeliveryPrice;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-semibold">Your Order</span>
          <span className="text-lg">Rs. {getTotalCost()}</span>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-10 md:gap-4">
        {cartItems.map((cartItem) => (
          <React.Fragment key={cartItem._id}>
            <div className="flex items-center justify-between">
              <span className="flex flex-1 flex-col items-start justify-center gap-2 md:flex-row md:items-center">
                <Badge
                  variant={"outline"}
                  className="flex w-28 items-center justify-between py-2"
                >
                  {cartItem.quantity === 1 ? (
                    <Trash
                      className="cursor-pointer"
                      onClick={() => handleDeleteButtonCart(cartItem)}
                    />
                  ) : (
                    <CircleMinus
                      className="cursor-pointer"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    />
                  )}
                  {cartItem.quantity}
                  <CirclePlus
                    className="cursor-pointer"
                    onClick={() => addToCart(cartItem)}
                  />
                </Badge>
                <span className="w-28 truncate whitespace-nowrap">
                  {cartItem.menuItemName}
                </span>
              </span>

              <span className="ml-2 flex w-[35%] items-center justify-center">
                <Trash
                  size={20}
                  color="red"
                  className="mr-2 cursor-pointer"
                  onClick={() => handleDeleteButtonCart(cartItem)}
                />
                Rs. {cartItem.menuItemPrice * cartItem.quantity}
              </span>
            </div>
          </React.Fragment>
        ))}

        <Separator />

        <div className="mt-2 flex items-center justify-between">
          <span>Delivery Price</span>
          <span>Rs. {restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
