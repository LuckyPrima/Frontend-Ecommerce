// src/components/ProductImages.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="h-[500px] xl:h-[600px] relative flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-400 font-medium">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* MAIN IMAGE */}
      <div 
        className="aspect-square md:aspect-auto md:h-[500px] xl:h-[600px] relative rounded-3xl overflow-hidden bg-slate-50 shadow-md ring-1 ring-slate-200/50 group cursor-zoom-in"
        onClick={() => setIsModalOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Product Main Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide snap-x items-center">
          {images.map((imgUrl, i) => (
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`min-w-[80px] w-24 h-24 md:min-w-[100px] md:h-28 relative cursor-pointer snap-start rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                index === i 
                  ? "ring-2 ring-primary ring-offset-2 opacity-100" 
                  : "ring-1 ring-slate-200 opacity-60 hover:opacity-100 hover:shadow-md"
              }`}
              key={imgUrl}
              onClick={() => setIndex(i)}
            >
              <Image
                src={imgUrl}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all z-[999999]"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[80vh] sm:h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt="Product Full Image"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImages;
