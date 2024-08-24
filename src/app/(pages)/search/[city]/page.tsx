"use client";

import CuisinesFilter from "@/components/Search/CuisinesFilter";
import SearchBar from "@/components/Search/SearchBar";
import SearchResults from "@/components/Search/SearchResults";
import SortOptions from "@/components/Search/SortOptions";
import SearchResultsCardSkeleton from "@/components/Skeletons/SearchResultsCardSkeleton";
import { useSearchRestaurants } from "@/hooks/RestaurantApi";
import { SearchSchemaType } from "@/schemas/SearchSchema";
import Link from "next/link";
import React, { useState } from "react";

export type SearchStateType = {
  searchQuery: string;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = ({ params }: { params: { city: string } }) => {
  const city = params.city;

  const [searchState, setSearchState] = useState<SearchStateType>({
    searchQuery: "",
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { searchResults, isLoading } = useSearchRestaurants(searchState, city);

  const [isCuisinesFilterListExpanded, setIsCuisinesFilterListExpanded] =
    useState(false);

  const handleSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
    }));
  };

  const handleSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
    }));
  };

  const handleSearchPageSubmit = (searchFormData: SearchSchemaType) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const handleSearchPageReset = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  if (!city) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>No results found for searched city.!</span>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center gap-10 px-3 py-14 lg:flex-row lg:items-start lg:px-5">
      {/* Cuisines List */}
      <div className="sticky top-10 w-full lg:w-[25%]">
        <CuisinesFilter
          onCuisineChange={handleSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isCuisinesFilterListExpanded}
          handleCuisinesFilterListExpand={() =>
            setIsCuisinesFilterListExpanded((prev) => !prev)
          }
        />
      </div>

      <div className="flex w-full flex-col gap-7">
        <div className="md:px-16 lg:px-0">
          <SearchBar
            onSubmit={handleSearchPageSubmit}
            placeHolder="Search by restaurant name or cuisine."
            onReset={handleSearchPageReset}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 py-3 lg:flex-row lg:items-start lg:justify-start lg:py-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
              <SearchResultsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          searchResults?.data && (
            <div className="flex w-full flex-col items-start">
              {/* Header part */}
              <div className="mt-3 flex w-full flex-col items-center justify-between gap-3 lg:mt-0 lg:flex-row">
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold md:text-2xl">
                    {searchResults?.pagination.totalDocuments} restaurants found
                    in {city}
                  </span>
                </div>

                <SortOptions onSortOptionSelect={handleSortOption} />
              </div>

              <SearchResults searchResults={searchResults?.data} />
            </div>
          )
        )}

        {!searchResults?.data && !isLoading && (
          <div className="flex min-h-screen items-center justify-center">
            <span>No results found!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
