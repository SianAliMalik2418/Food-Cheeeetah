import { CUISINES_ITEMS } from "@/lib/utils";
import React from "react";
import { Label } from "../ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

type CuisinesFilterProps = {
  onCuisineChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  handleCuisinesFilterListExpand: () => void;
};

const CuisinesFilter = ({
  onCuisineChange,
  selectedCuisines,
  isExpanded,
  handleCuisinesFilterListExpand,
}: CuisinesFilterProps) => {
  const handleCuisinesFilterReset = () => {
    onCuisineChange([]);
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onCuisineChange(newCuisineList);
  };

  return (
    <div className="w-full flex-col gap-3 md:px-20 lg:p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Filter by Cuisines</h1>
        <span
          className="cursor-pointer text-sm underline"
          onClick={handleCuisinesFilterReset}
        >
          Reset
        </span>
      </div>

      <div className="mt-5 flex flex-col items-start justify-start gap-5">
        {CUISINES_ITEMS.slice(0, isExpanded ? CUISINES_ITEMS.length : 5).map(
          (cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);

            return (
              <>
                <input
                  type="checkbox"
                  className="hidden w-full"
                  value={cuisine}
                  id={`cuisine_${cuisine}`}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />

                <div
                  className={`flex w-full gap-3 rounded-xl border px-2 py-1 ${isSelected ? "border-primary text-primary" : "border-gray-500"} cursor-pointer`}
                >
                  {isSelected && <Check className="text-primary" />}
                  <Label
                    htmlFor={`cuisine_${cuisine}`}
                    className="w-full cursor-pointer text-base"
                  >
                    {cuisine}
                  </Label>
                </div>
              </>
            );
          },
        )}

        <Button
          variant={"link"}
          className="flex w-full items-center justify-center"
          onClick={handleCuisinesFilterListExpand}
        >
          {isExpanded ? (
            <span className="flex items-center justify-center gap-1">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CuisinesFilter;
