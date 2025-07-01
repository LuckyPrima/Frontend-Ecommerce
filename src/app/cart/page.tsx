"use client";

import React, { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../stores/useCartStore";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartItem from "../../components/CartItem";
import PeopleAlsoBought from "../../components/PeopleAlsoBought";
import OrderSummary from "../../components/OrderSummary";
import LoadingSpinner from "../../components/LoadingSpinner";

const CartPage = () => {
  const { user } = useUserStore();
  const { cart, getCartItems, loading, checkAndApplyInitialCoupon } =
    useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
    if (user) {
      getCartItems();
      checkAndApplyInitialCoupon();
    }
  }, [user, router, getCartItems, checkAndApplyInitialCoupon]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-20 md:pb-8 lg:pb-8">
      <Link
        href="/"
        className="flex items-center gap-2 mt-6 mb-6 text-primary hover:text-blue-900"
      >
        <ChevronLeft size={20} /> Back To Homepage
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col md:flex-row md:gap-4 lg:gap-8">
          <motion.div
            className="w-full md:flex-1 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <PeopleAlsoBought />
          </motion.div>

          <motion.div
            className="hidden md:block md:w-80 lg:w-96 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OrderSummary isMobileFixed={false} />
          </motion.div>

          <div className="block md:hidden">
            <OrderSummary isMobileFixed={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

const EmptyCart = () => (
  <motion.div
    className="flex flex-col gap-2 md:gap-4 items-center justify-center min-h-screen"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-16 w-16 md:w-24 md:h-24 text-slate-300" />
    <h3 className="text-lg md:text-2xl font-semibold">Your cart is empty</h3>
    <p className="text-sm md:text-base text-center text-slate-400">
      Looks like you have not added anything to your cart
    </p>
    <Link
      href="/"
      className="mt-4 rounded-md bg-primary px-6 py-2 text-white transition-colors hover:bg-blue-600"
    >
      Start Shopping
    </Link>
  </motion.div>
);
