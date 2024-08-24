import Link from "next/link";
import { RestaurantType } from "@/types/types";
import SearchResultCard from "./SearchResultCard";

type SearchResultsProps = {
  searchResults: RestaurantType[];
};

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  return (
    <div className="mt-7 flex w-full flex-col justify-center gap-3 text-lg font-semibold lg:mt-0 lg:text-xl">
      {/* Restaurants display */}

      <div className="flex flex-col flex-wrap items-center justify-center gap-5 py-3 md:flex-row lg:items-start lg:justify-start lg:py-0">
        {searchResults.map((searchResult) => (
          <SearchResultCard restaurant={searchResult} key={searchResult._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
