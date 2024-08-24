import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

type SortOptionsProps = {
  onSortOptionSelect: (sortOption: string) => void;
};

const SortOptions = ({ onSortOptionSelect }: SortOptionsProps) => {
  const SORT_OPTIONS = [
    {
      label: "Best Match",
      value: "bestMatch",
    },
    {
      label: "Fastest Delivery Time",
      value: "estimatedDeliveryTime",
    },
    {
      label: "Delivery Price",
      value: "deliveryPrice",
    },
  ];

  const [currentlySelectedSortOption, setCurrentlySelectedSortOption] =
    useState("Best Match");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          Sorted by : {currentlySelectedSortOption}
          <ChevronDown className="ml-3" size={"20"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {SORT_OPTIONS.map((sortOption) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              onSortOptionSelect(sortOption.value);
              setCurrentlySelectedSortOption(sortOption.label);
            }}
            key={sortOption.value}
          >
            <div className="flex items-center justify-between">
              <DropdownMenuLabel> {sortOption.label}</DropdownMenuLabel>
              {currentlySelectedSortOption === sortOption.label && (
                <Check size={"15"} />
              )}
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptions;
