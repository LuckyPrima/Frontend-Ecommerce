"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("name") as string;

    const currentParams = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      currentParams.set("search", searchTerm);
    } else {
      currentParams.delete("search");
    }

    router.push(`/list?${currentParams.toString()}`);
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Search size={24} strokeWidth={1.8} color="#6b7280" />
      </button>
    </form>
  );
};

export default SearchBar;
