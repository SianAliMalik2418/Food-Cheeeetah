import { SearchStateType } from "@/app/(pages)/search/[city]/page";
import { RestaurantType, SearchRestaurantResponseType } from "@/types/types";
import axios from "axios";
import { useQuery } from "react-query";

export const useSearchRestaurants = (
  searchState: SearchStateType,
  city?: string,
) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);

  const searchRestaurants = async (): Promise<SearchRestaurantResponseType> => {
    try {
      const response = await axios<SearchRestaurantResponseType>(
        `/api/restaurant/search/${city}?${params}`,
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const { data: searchResults, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    searchRestaurants,
    {
      enabled: !!city,
    },
  );

  return { searchResults, isLoading };
};

export const useGetSingleRestaurant = (restaurantId: string) => {
  const getRestaurantByIdRequest = async (): Promise<RestaurantType> => {
    try {
      const response = await axios.get(
        `/api/restaurant/details?restaurantId=${restaurantId}`,
      );

      console.log(response);
      return response?.data?.restaurant;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const { data: restaurant, isLoading } = useQuery(
    ["getRestaurantById"],
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    },
  );

  return { restaurant, isLoading };
};
