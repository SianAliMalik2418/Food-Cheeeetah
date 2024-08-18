import { FormDescription } from "@/components/ui/form";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "menuItems",
    control,
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your restaurant menu & give each item a name and price.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <MenuItemInput
            key={field.id}
            index={index}
            removeMenuItem={() => remove(index)}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={() => append({ menuItemPrice: "", menuItemName: "" })}
      >
        Add Another Item
      </Button>
    </div>
  );
};

export default MenuSection;
