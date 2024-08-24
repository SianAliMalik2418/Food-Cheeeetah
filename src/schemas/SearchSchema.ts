import { z } from "zod";

export const SearchSchema = z.object({
  searchQuery: z.string().min(1, "This field is required!"),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;
