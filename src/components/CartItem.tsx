import React from "react";
import { useCartStore } from "../stores/useCartStore";
import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";

const CartItem = ({ item }) => {
  const { deleteFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-md shadow-md bg-white p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-shrink-0">
          <div className="relative w-20 h-24 flex-shrink-0">
            <Image
              src={item.product?.image?.[0] || "/no-image.png"}
              alt={item.product?.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-md md:text-lg font-semibold text-gray-800 truncate">
            {item.product?.name}
          </p>
          <p className="text-md md:text-base font-bold text-primary">
            ${parseFloat(item.product?.price || 0).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-red-500 hover:text-red-700 transition-colors"
            onClick={() => deleteFromCart(item.id)}
          >
            <Trash size={20} />
          </button>

          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
            <button
              className="p-2 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <p className="px-3 py-1 text-gray-800">{item.quantity}</p>
            <button
              className="p-2 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
