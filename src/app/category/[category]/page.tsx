// app/category/[category]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useProductStore } from "../../../stores/useProductStore";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductCard from "../../../components/ProductCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { fetchProductsByCategory, products, loading } = useProductStore();
  const { category } = useParams();

  const categoryString = Array.isArray(category) ? category[0] : category;

  useEffect(() => {
    if (categoryString) {
      fetchProductsByCategory(categoryString);
    }
  }, [fetchProductsByCategory, categoryString]);

  if (loading || !products) {
    return <LoadingSpinner />;
  }

  console.log("Products in page.tsx:", products);
  console.log("Is products an Array?", Array.isArray(products));
  console.log("Products length:", products.length);

  return (
    <div className="min-h-screen">
      <div className="relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link
          href="/"
          className="flex items-center gap-2 mt-6 mb-6 text-primary hover:text-blue-900"
        >
          <ChevronLeft size={20} /> Back To Homepage
        </Link>

        <motion.h1
          className=" text-center text-3xl md:text-4xl font-bold mb-8 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {categoryString
            ? categoryString.charAt(0).toUpperCase() + categoryString.slice(1)
            : ""}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products.length === 0 && (
            <h2 className="text-2xl md:text-3xl text-center text-gray-300 col-span-full">
              No Products Found
            </h2>
          )}

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
