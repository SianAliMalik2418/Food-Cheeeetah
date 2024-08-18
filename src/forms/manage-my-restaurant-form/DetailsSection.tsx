import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

function DetailsSection() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold">Details</h2>
        <FormDescription>Enter your restaurant details.</FormDescription>
      </div>
      {/* Name field */}
      <div className="md:max-w-1/3 max-w-full">
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* City & Country fields */}
      <div className="flex flex-col gap-4 md:flex-row">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter city name here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter country name here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel>Delivery Price (Rs)</FormLabel>
            <FormControl>
              <Input placeholder="50" type="number" min={1} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel>Estimated Delivery Time(mins)</FormLabel>
            <FormControl>
              <Input placeholder="30" type="number" min={1} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DetailsSection;
