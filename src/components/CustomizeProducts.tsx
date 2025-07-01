// src/components/CustomizeProducts.tsx
"use client";

import React, { useState, useEffect } from "react";

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
    <div className="flex flex-col gap-6">
      {/* Choose a Color */}
      {colors && colors.length > 0 && (
        <>
          <h4 className="font-medium">Choose a Color</h4>
          <ul className="flex items-center gap-3">
            {colors.map((color, index) => (
              <li
                key={index}
                className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <div className="absolute w-10 h-10 rounded-full ring-2 ring-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Choose a Size */}
      {sizes && sizes.length > 0 && (
        <>
          <h4 className="font-medium">Choose a Size</h4>
          <ul className="flex items-center gap-3">
            {sizes.map((size, index) => (
              <li
                key={index}
                className={`ring-1 ring-primary rounded-md py-1 px-4 text-sm cursor-pointer
                  ${
                    selectedSize === size
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CustomizeProducts;
