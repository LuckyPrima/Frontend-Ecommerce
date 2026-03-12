// src/app/[slug]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "../../../stores/useProductStore";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductImages from "../../../components/ProductImages";
import CustomizeProducts from "../../../components/CustomizeProducts";
import Add from "../../../components/Add";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCcw, ChevronLeft } from "lucide-react";

const SinglePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { fetchProductById, currentProduct, loading } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (loading || !currentProduct) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const { name, shortDescription, description, price, image, color, size } =
    currentProduct;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 max-w-7xl mx-auto">
        {/* Breadcrumb / Back Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </motion.button>

        <div className="relative flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* IMG SECTION */}
          <div className="w-full lg:w-[50%] lg:sticky top-28 h-max z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProductImages images={image} />
            </motion.div>
          </div>

          {/* TEXTS SECTION */}
          <motion.div
            className="w-full lg:w-[80%] flex flex-col gap-8 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100/50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Area */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {name}
                </h1>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed font-light">
                {shortDescription}
              </p>
            </motion.div>

            {/* Price Area */}
            <motion.div
              variants={itemVariants}
              className="flex items-baseline gap-4 mt-2"
            >
              <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                $
                {Number(price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="h-px w-full bg-slate-100"
            />

            {/* Customize (Color / Size) */}
            <motion.div variants={itemVariants}>
              <CustomizeProducts colors={color || []} sizes={size || []} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="h-px w-full bg-slate-100 mt-2 mb-2"
            />

            {/* Add to Cart */}
            <motion.div variants={itemVariants}>
              <Add product={currentProduct} />
            </motion.div>

            {/* Features / Guarantees Block */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-4 border-t border-slate-100"
            >
              <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Secure Payment
                </span>
                <span className="text-xs text-slate-500">100% Protected</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Fast Delivery
                </span>
                <span className="text-xs text-slate-500">
                  2-4 Business Days
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Free Returns
                </span>
                <span className="text-xs text-slate-500">Within 30 Days</span>
              </div>
            </motion.div>

            {/* Description Tab */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-slate-100"
            >
              <h4 className="font-bold text-slate-900 mb-4 text-xl">
                Product Description
              </h4>
              <div className="prose prose-slate prose-p:leading-relaxed max-w-none">
                <p className="whitespace-pre-line text-slate-600">
                  {description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
