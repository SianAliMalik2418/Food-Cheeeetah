"use client";

import React, { useState } from "react";
import SearchBar from "../Search/SearchBar";
import { useRouter } from "next/navigation";
import { SearchSchemaType } from "@/schemas/SearchSchema";

const HeroSectionSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (searchValue: SearchSchemaType) => {
    setIsLoading(true);
    router.push(`/search/${searchValue.searchQuery}`);
  };
  return (
    <>
      <SearchBar
        placeHolder="Search by city."
        onSubmit={handleSearch}
        isLoading={isLoading}
      />
      <p className="mt-2 text-xs text-red-500">
        *Note : Available in Lahore only right now.
      </p>
    </>
  );
};

export default HeroSectionSearch;
