"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, Package, DollarSign, Tag, Box, 
  Layers, Palette, FileText, Image as ImageIcon 
} from "lucide-react";
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
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 md:p-8 bg-slate-50 min-h-screen">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-slate-500 hover:text-primary transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back To Products</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Product Details
        </h1>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm w-fit">
          ID: {id}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Essential Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Product Name
                </label>
                <div className="text-slate-800 font-medium text-lg bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {formData.name || <span className="text-slate-400 italic">Not set</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Short Description
                </label>
                <div className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line leading-relaxed">
                  {formData.shortDescription || <span className="text-slate-400 italic">Not set</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Full Description
                </label>
                <div className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line leading-relaxed min-h-[120px]">
                  {formData.description || <span className="text-slate-400 italic">Not set</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Product Media
            </h2>
            
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.images.map((img, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="w-full py-12 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <ImageIcon className="w-12 h-12 text-slate-300 mb-3" />
                <span className="text-slate-400 font-medium">No images uploaded</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Numbers & Variants */}
        <div className="space-y-8">
          
          {/* Pricing & Inventory Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Inventory & Pricing
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Price</label>
                    <span className="text-xl font-black text-slate-800 mt-0.5 block">
                      ${Number(formData.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Stock</label>
                    <span className="text-xl font-black text-slate-800 mt-0.5 block">
                      {formData.countInStock} <span className="text-sm font-medium text-slate-500">units</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                    <span className="text-lg font-bold text-slate-800 capitalize mt-0.5 block">
                      {formData.category || "Uncategorized"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variants Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Variants
            </h2>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                  <Palette className="w-4 h-4" /> Available Colors
                </label>
                <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  {formData.colors.length > 0 ? (
                    formData.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))
                  ) : (
                    <span className="text-slate-400 italic text-sm">No colors defined</span>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                  <Layers className="w-4 h-4" /> Available Sizes
                </label>
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  {formData.sizes.length > 0 ? (
                    formData.sizes.map((size, index) => (
                      <span key={index} className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
                        {size}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic text-sm">No sizes defined</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
