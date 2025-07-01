// src/components/ProductImages.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-[500px] relative flex items-center justify-center bg-gray-200 rounded-md">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="h-[500px] relative">
        <Image
          src={images[index]}
          alt="Product Image"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8 cursor-pointer">
        {images.map((imgUrl, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8"
            key={imgUrl}
            onClick={() => setIndex(i)}
          >
            <Image
              src={imgUrl}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
