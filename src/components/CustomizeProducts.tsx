// src/components/CustomizeProducts.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomizeProducts = ({ colors, sizes }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (colors && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
    if (sizes && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [colors, sizes]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Choose a Color */}
      {colors && colors.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800 tracking-wide text-sm uppercase opacity-80">Color Options</h4>
          <ul className="flex flex-wrap items-center gap-4">
            {colors.map((color, index) => (
              <li
                key={index}
                className={`w-11 h-11 rounded-full cursor-pointer relative flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110`}
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <motion.div
                    layoutId="colorRing"
                    className="absolute w-14 h-14 rounded-full ring-2 ring-primary border-4 border-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Choose a Size */}
      {sizes && sizes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 tracking-wide text-sm uppercase opacity-80">Size Select</h4>
          </div>
          <ul className="flex flex-wrap items-center gap-3">
            {sizes.map((size, index) => (
              <li
                key={index}
                className={`flex-1 min-w-[3.5rem] sm:flex-none text-center rounded-xl py-2.5 px-6 font-semibold text-sm transition-all duration-300 cursor-pointer border
                  ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 transform scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:bg-slate-50 hover:shadow-sm"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomizeProducts;
