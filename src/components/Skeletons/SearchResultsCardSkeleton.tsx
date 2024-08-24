import React from "react";
import { Skeleton } from "../ui/skeleton";

const SearchResultsCardSkeleton = () => {
  return (
    <div className="flex h-[18rem] w-[20rem] cursor-pointer flex-col gap-3 rounded-lg shadow-2xl transition-all hover:scale-[1.02] xl:mt-10 xl:w-[19rem]">
      <Skeleton className="h-[60%] w-full overflow-hidden rounded-lg" />

      <div className="flex flex-col gap-4 px-3">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
};

export default SearchResultsCardSkeleton;
