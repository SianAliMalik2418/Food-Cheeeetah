import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type ButtonLoadingProps = {
  children: string;
  isLoading?: boolean;
  className?: string;
};

const ButtonLoading = ({
  children,
  isLoading = false,
  className,
}: ButtonLoadingProps) => {
  return (
    <div className={className}>
      {isLoading ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button className="w-full">{children}</Button>
      )}
    </div>
  );
};

export default ButtonLoading;
