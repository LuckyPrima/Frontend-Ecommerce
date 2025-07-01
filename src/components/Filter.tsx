"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
  "watches",
];

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "");
  }, [searchParams]);

  const handleFilterChange = (name, value) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value) {
      currentParams.set(name, value);
    } else {
      currentParams.delete(name);
    }
    router.push(`/list?${currentParams.toString()}`);
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row justify-between gap-4 md:gap-6">
      <div className="flex flex-wrap gap-4 md:gap-6 w-full md:w-auto">
        <input
          type="number"
          name="minPrice"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 ring-1 ring-gray-400 p-2 flex-1 min-w-0 md:w-24"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            handleFilterChange("minPrice", e.target.value);
          }}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 ring-1 ring-gray-400 p-2 flex-1 min-w-0 md:w-24"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            handleFilterChange("maxPrice", e.target.value);
          }}
        />
        <select
          name="category"
          id="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] flex-1 min-w-0 md:w-auto"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange("category", e.target.value);
          }}
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-auto">
        <select
          name="sortBy"
          id="sortBy"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 w-full md:w-auto"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            handleFilterChange("sortBy", e.target.value);
          }}
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price (low to high)</option>
          <option value="priceDesc">Price (high to low)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
