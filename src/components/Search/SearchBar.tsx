"use client";

import { SearchSchema, SearchSchemaType } from "@/schemas/SearchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import ButtonLoading from "../ui/ButtonLoading";
import { IoClose } from "react-icons/io5";

type SearchBarProps = {
  placeHolder: string;
  onSubmit: (searchValue: SearchSchemaType) => void;
  onReset?: () => void;
  isLoading?: boolean;
};

const SearchBar = ({
  placeHolder,
  onSubmit,
  onReset,
  isLoading,
}: SearchBarProps) => {
  const form = useForm<SearchSchemaType>({
    defaultValues: {
      searchQuery: "",
    },
    resolver: zodResolver(SearchSchema),
  });

  const handleReset = () => {
    form.reset();

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center justify-between rounded-2xl border-2 bg-white px-1 py-3 shadow-md md:px-4 ${form.formState.errors.searchQuery && "border-red-500"}`}
      >
        <div className="flex flex-1 items-center justify-start gap-2">
          <SearchIcon className="hidden text-primary md:block" />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder={placeHolder}
                    {...field}
                    className="border-none shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          {form.formState.isDirty && (
            <IoClose cursor={"pointer"} onClick={handleReset} />
          )}
          <ButtonLoading type="submit" isLoading={isLoading}>
            Search
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
