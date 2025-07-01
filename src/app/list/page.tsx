"use client";

import Filter from "../../components/Filter";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "next/navigation";

const ListPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "";

  const buildProductApiUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (category) params.append("category", category);
    if (sortBy) params.append("sortBy", sortBy);

    const queryString = params.toString();
    return queryString ? `/product?${queryString}` : "/product";
  }, [searchTerm, minPrice, maxPrice, category, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const recommendProduct = await axios.get("/product/recommendations");
        setRecommendations(recommendProduct.data);

        const productApiUrl = buildProductApiUrl();
        const productSelected = await axios.get(productApiUrl);
        setSelectedProduct(productSelected.data.products);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch products"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, minPrice, maxPrice, category, sortBy, buildProductApiUrl]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-primary text-white py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt=""
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <div className="mt-8 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedProduct.length > 0 ? (
          selectedProduct.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-xl font-semibold text-primary col-span-full text-center">
            No products found for &quot;
            {searchTerm ||
              (category && `category '${category}'`) ||
              (minPrice && `min price ${minPrice}`) ||
              (maxPrice && `max price ${maxPrice}`)}
            &quot;
          </div>
        )}
      </div>
      <h1 className="mb-6 mt-8 text-xl font-semibold">
        Recommendations For You
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.slice(0, 6).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
