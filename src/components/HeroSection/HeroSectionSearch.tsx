"use client";

import React from "react";
import SearchBar from "../Search/SearchBar";
import { useRouter } from "next/navigation";
import { SearchSchemaType } from "@/schemas/SearchSchema";

const HeroSectionSearch = () => {
  const router = useRouter();

  const handleSearch = (searchValue: SearchSchemaType) => {
    router.push(`/search/${searchValue.searchQuery}`);
  };
  return (
    <>
      <SearchBar
        placeHolder="Search by city or town."
        onSubmit={handleSearch}
      />
    </>
  );
};

export default HeroSectionSearch;
