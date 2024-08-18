import { z } from "zod";

export const RestaurantSchema = z.object({
  restaurantName: z.string({ required_error: "Restaurant name is required!" }),

  city: z.string({ required_error: "City name is required!" }),

  country: z.string({ required_error: "Country name is required!" }),

  estimatedDeliveryTime: z.coerce.number({
    required_error: "Country name is required!",
    invalid_type_error: "Estimated Delivery time must be a valid number",
  }),

  deliveryPrice: z.coerce.number({
    required_error: "Delivery Price name is required!",
    invalid_type_error: "Delivery Price time must be a valid number",
  }),

  coverImage: z.string({ required_error: "Cover image is required" }),

  cuisines: z.string().array().nonempty({
    message: "Please select atleast 1 cuisine!",
  }),

  menuItems: z.array(
    z.object({
      menuItemName: z.string().min(1, "This field is required"),
      menuItemPrice: z.coerce.number().min(1, "Price should be more than 1"),
    }),
  ),
});

export type RestaurantSchemaType = z.infer<typeof RestaurantSchema>;
