import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type MenuItemInputProps = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: MenuItemInputProps) => {
  const { control, watch } = useFormContext();

  const menuItems = watch("menuItems");

  const handleRemove = () => {
    if (menuItems.length > 1) {
      removeMenuItem();
    } else {
      toast.warning("You must have at least one menu item.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-3 md:flex-row md:items-end md:justify-start md:px-0">
      <FormField
        name={`menuItems.${index}.menuItemName`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Name</FormLabel>
            <FormMessage />

            <FormControl>
              <Input {...field} placeholder="Cheese Pizza" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`menuItems.${index}.menuItemPrice`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (Rs)</FormLabel>
            <FormMessage />
            <FormControl>
              <Input {...field} placeholder="400" min={1} type="number" />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        className="w-full md:w-fit"
        variant={"destructive"}
        onClick={handleRemove}
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
