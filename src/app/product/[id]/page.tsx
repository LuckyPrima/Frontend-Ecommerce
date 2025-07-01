// src/app/[slug]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "../../../stores/useProductStore";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductImages from "../../../components/ProductImages";
import CustomizeProducts from "../../../components/CustomizeProducts";
import Add from "../../../components/Add";

const SinglePage = () => {
  const { id } = useParams();
  const { fetchProductById, currentProduct, loading } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (loading || !currentProduct) {
    return <LoadingSpinner />;
  }

  const { name, shortDescription, description, price, image, color, size } =
    currentProduct;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={image} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-medium">{name}</h1>
        <p className="text-gray-500">{shortDescription}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h2 className="font-medium text-2xl">${price}</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts colors={color || []} sizes={size || []} />
        {/* Pass currentProduct as 'product' prop */}
        <Add product={currentProduct} />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mt-4">Description</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
