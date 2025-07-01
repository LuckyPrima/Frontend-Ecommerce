"use client";

import Image from "next/image";
import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const truncateTextAfterWords = (text, numWords) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= numWords) {
    return text;
  }
  return words.slice(0, numWords).join(" ") + "...";
};

const CartModal = () => {
  const { cart, subtotal, deleteFromCart } = useCartStore();

  return (
    <div className="w-96 absolute p-4 rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {cart.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center gap-4 text-primary">
          <ShoppingCart size={50} strokeWidth={2} />
          <span className="font-semibold text-2xl">Cart Is Empty</span>
          <span className="text-gray-500 text-md">Continue Shopping</span>
        </div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {cart.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <div className="relative w-[72px] h-[92px] flex-shrink-0">
                  <Image
                    src={item.product?.image?.[0] || "/no-image.png"}
                    alt={item.product?.name || "Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold pr-2">
                        {truncateTextAfterWords(item.product?.name, 3)}{" "}
                      </h3>
                      <div className="p-1 bg-slate-50 rounded-sm whitespace-nowrap flex-shrink-0">
                        ${parseFloat(item.product?.price || 0).toFixed(2)}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className=" text-sm text-gray-500">Available</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500 hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        deleteFromCart(item.id);
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-end text-sm">
              <Link href="/cart">
                <button className="rounded-md py-3 px-4 bg-black text-white">
                  View Cart
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
