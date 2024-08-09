import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type ButtonLoadingProps = {
  children: string;
  isLoading?: boolean;
};

const ButtonLoading = ({ children, isLoading = false }: ButtonLoadingProps) => {
  return (
    <div className="w-full">
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
