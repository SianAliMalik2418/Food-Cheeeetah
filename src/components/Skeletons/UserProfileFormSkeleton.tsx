import React from "react";
import { Skeleton } from "../ui/skeleton";

const UserProfileFormSkeleton = () => {
  return (
    <div className="flex w-[300px] flex-col gap-3 p-2 md:w-[800px]">
      <Skeleton className="h-10 w-full md:w-1/2" />
      <Skeleton className="h-10 w-full md:w-1/2" />
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
};

export default UserProfileFormSkeleton;
