"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useProductStore } from "../../../../../stores/useProductStore";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { useUserStore } from "../../../../../stores/useUserStore";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { fetchProductById, currentProduct, loading } = useProductStore();
  const { user, checkingAuth } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    images: [],
    sizes: [],
    colors: [],
  });

  useEffect(() => {
    if (!checkingAuth && user?.role !== "admin") {
      router.replace("/auth/login");
    }
  }, [checkingAuth, user, router]);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || "",
        shortDescription: currentProduct.shortDescription || "",
        description: currentProduct.description || "",
        price: currentProduct.price || 0,
        category: currentProduct.category || "",
        countInStock: currentProduct.countInStock || 0,
        images: Array.isArray(currentProduct.image)
          ? currentProduct.image
          : currentProduct.image
          ? currentProduct.image
          : [],
        sizes: Array.isArray(currentProduct.size)
          ? currentProduct.size
          : currentProduct.size
          ? [currentProduct.size]
          : [],
        colors: Array.isArray(currentProduct.color)
          ? currentProduct.color
          : currentProduct.color
          ? [currentProduct.color]
          : [],
      });
    }
  }, [currentProduct]);

  if (loading || !currentProduct) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-slate-100 rounded-lg shadow-lg">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mt-6 mb-6 text-primary hover:text-blue-900"
      >
        <ChevronLeft />
        <span>Back To Dashboard</span>
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold mb-6 text-primary"
      >
        Product Details
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Name
          </label>
          <div className="text-slate-700">{formData.name}</div>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Short Description
          </label>
          <div className="text-slate-700">{formData.shortDescription}</div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Description
          </label>
          <div className="text-slate-700">{formData.description}</div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Price
          </label>
          <div className="text-slate-700">$ {formData.price}</div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Category
          </label>
          <div className="text-slate-700">{formData.category}</div>
        </div>

        <div>
          <label
            htmlFor="countInStock"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            In Stock
          </label>
          <div className="text-slate-700">{formData.countInStock}</div>
        </div>

        <div>
          <label
            htmlFor="sizes"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Sizes
          </label>
          <div className="text-slate-700">
            {formData.sizes.length > 0 ? formData.sizes.join(", ") : "-"}
          </div>
        </div>

        <div>
          <label
            htmlFor="colors"
            className="block text-md font-medium text-slate-500 mb-2"
          >
            Colors
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.colors.length > 0 ? (
              formData.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-slate-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))
            ) : (
              <span className="text-slate-400">No colors</span>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {formData.images.map((img, index) => (
            <div key={index} className="relative group">
              <Image
                key={index}
                src={img}
                alt={`img-${index}`}
                className="w-full h-full object-cover rounded"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </motion.form>
    </div>
  );
};

export default ProductDetails;
