import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const productId = product.id;
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(productId, 1);
    }
  };

  const imageUrl =
    Array.isArray(product.image) &&
    product.image.length > 0 &&
    typeof product.image[0] === "string"
      ? product.image[0]
      : product.name;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col w-full h-full relative overflow-hidden rounded-lg shadow-lg bg-white group">
        <div className="relative w-full h-60 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-300" />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h5 className="text-md md:text-lg font-semibold tracking-tight text-gray-900">
              {product.name}
            </h5>

            <div className="mt-2 mb-5 flex items-center justify-between">
              <span className="text-lg md:text-2xl font-bold text-primary">
                $ {product.price}
              </span>
            </div>
          </div>

          <button
            className="flex items-center justify-center w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
