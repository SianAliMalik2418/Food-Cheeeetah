import { SearchStateType } from "@/app/(pages)/search/[city]/page";
import { SearchRestaurantResponseType } from "@/types/types";
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
