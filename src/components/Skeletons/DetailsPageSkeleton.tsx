import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DetailsPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 p-5">
      <AspectRatio ratio={16 / 5}>
        <Skeleton className="h-full w-full rounded-lg object-cover object-center" />
      </AspectRatio>
      <div className="grid gap-5 md:grid-cols-[4fr_2.5fr] md:px-14 lg:px-28">
        <div className="flex flex-col gap-4">
          <Card className="border-sla">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="mt-5 h-10 w-full" />
              </CardTitle>
              <CardDescription>
                <Skeleton />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <span className="mt-5 text-2xl font-bold tracking-tight">Menu</span>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div>
          <Card className="sticky top-32">
            <Skeleton className="h-44 w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageSkeleton;
