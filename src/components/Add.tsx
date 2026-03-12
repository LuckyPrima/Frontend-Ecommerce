"use client";

import React, { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { Minus, Plus, ShoppingCart, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Add = ({ product }) => {
  const productId = product.id;
  const stock = product.countInStock || 0;

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(productId, quantity);
    }
  };

  if (stock === 0) {
    return (
       <div className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-6 rounded-2xl border border-red-100 font-medium animate-pulse mt-4">
         <AlertCircle className="w-5 h-5" />
         Currently Out of Stock
       </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mt-4">
      <h4 className="font-bold text-slate-800 tracking-wide text-sm uppercase opacity-80">Quantity</h4>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-2xl flex items-center justify-between w-36 shadow-sm">
            <button
              className="cursor-pointer text-slate-500 hover:text-primary transition-colors p-1 disabled:opacity-30 disabled:hover:text-slate-500"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-semibold text-lg text-slate-800">{quantity}</span>
            <button
              className="cursor-pointer text-slate-500 hover:text-primary transition-colors p-1 disabled:opacity-30 disabled:hover:text-slate-500"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stock}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-xs text-slate-500 leading-snug">
            Only <span className="text-orange-600 font-bold">{stock} items</span> left!
            <br />
            Don't miss it
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-primary text-white py-4 px-8 font-semibold text-sm shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider whitespace-nowrap shrink-0"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          <ShoppingCart className="w-5 h-5 shrink-0" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Add;
