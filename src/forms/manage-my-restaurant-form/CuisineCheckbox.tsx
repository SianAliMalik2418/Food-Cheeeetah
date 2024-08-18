import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type CuisineCheckboxProps = {
  cuisineItem: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisineItem, field }: CuisineCheckboxProps) => {
  return (
    <FormItem className="mt-2 flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisineItem)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisineItem]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisineItem),
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisineItem}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
