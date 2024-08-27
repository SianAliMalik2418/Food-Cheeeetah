import { CartItemType } from "@/app/(pages)/details/[restaurantId]/page";

export type User = {
  _id: string;
  email: string;
  username: string;
  city: string;
  country: string;
  addressLine1: string;
};

export type MenuItemType = {
  _id?: string;
  menuItemName: string;
  menuItemPrice: number;
};

export type RestaurantType = {
  _id: string;
  userId: string;
  restaurantName: string;
  city: string;
  country: string;
  estimatedDeliveryTime: number;
  deliveryPrice: number;
  coverImage: string;
  cuisines: [string, ...string[]];
  menuItems: MenuItemType[];
};

export type SearchRestaurantResponseType = {
  data: RestaurantType[];
  pagination: {
    totalDocuments: number;
    page: number;
    pageSize: number;
  };
};

export type OrderDetailsType = {
  restaurant: string;
  user: string;
  deliveryDetails: {
    email: string;
    username: string;
    addressLine1: string;
    city: string;
  };
  cartItems: CartItemType[];
  totalAmount: number;
  status: "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";
};

export type OrderStatusType =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type OrderStatusApiResponseType = {
  _id: string;
  restaurant: RestaurantType;
  user: User;
  deliveryDetails: {
    email: string;
    username: string;
    addressLine1: string;
    city: string;
  };
  cartItems: CartItemType[];
  totalAmount: number;
  status: OrderStatusType;
  createdAt: Date;
};
