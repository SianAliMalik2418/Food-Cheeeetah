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

type SortOptionsProps = {
  selectedSortOption: string;
  onSortOptionSelect: (sortOption: string) => void;
};

const SortOptions = ({
  selectedSortOption,
  onSortOptionSelect,
}: SortOptionsProps) => {
  const SORT_OPTIONS = [
    { label: "Best Match", value: "bestMatch" },
    { label: "Fastest Delivery Time", value: "estimatedDeliveryTime" },
    { label: "Delivery Price", value: "deliveryPrice" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          Sorted by :{" "}
          {
            SORT_OPTIONS.find((option) => option.value === selectedSortOption)
              ?.label
          }
          <ChevronDown className="ml-3" size={"20"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {SORT_OPTIONS.map((sortOption) => (
          <DropdownMenuItem
            key={sortOption.value}
            className="cursor-pointer"
            onClick={() => onSortOptionSelect(sortOption.value)}
          >
            <div className="flex items-center justify-between">
              <DropdownMenuLabel>{sortOption.label}</DropdownMenuLabel>
              {selectedSortOption === sortOption.value && <Check size={"15"} />}
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptions;
