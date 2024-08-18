import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CUISINES_ITEMS } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

function CuisinesSection() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <div className="grid gap-3 md:grid-cols-5">
              {CUISINES_ITEMS.map((cuisineItem) => (
                <CuisineCheckbox
                  key={cuisineItem}
                  cuisineItem={cuisineItem}
                  field={field}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

export default CuisinesSection;
