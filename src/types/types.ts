export type User = {
  _id: string;
  email: string;
  username: string;
  city: string;
  country: string;
  addressLine1: string;
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
  menuItems: {
    menuItemName: string;
    menuItemPrice: number;
  }[];
};
