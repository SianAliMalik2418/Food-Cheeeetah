export type User = {
  _id: string;
  email: string;
  username: string;
  city: string;
  country: string;
  addressLine1: string;
};

export type MenuItemType = {
  _id: string;
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
