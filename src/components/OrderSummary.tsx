import React, { useState } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51RXIASD8gXyBAHccRsR2nfwmDxLEsrCEKAZjkC2p2MExedMmCa2Vz3Mm4NRSHHyuSafcxJGsIOsC5VgvYyXY7x1s00fbvhHoQE"
);

const OrderSummary = ({ isMobileFixed = false }) => {
  const { subtotal, total, cart, coupon, applyCoupon, removeCoupon } =
    useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(null);

  const handleApplyCoupon = async () => {
    setCouponError(null);
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    const success = await applyCoupon(couponCode);
    if (success) {
      toast.success("Coupon applied successfully!");
      setCouponCode("");
    } else {
      setCouponError("Invalid or expired coupon.");
    }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponCode("");
    setCouponError(null);
    toast.success("Coupon removed!");
  };

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js has not loaded properly.");
        return;
      }

      const res = await axios.post("/payment/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const sessionId = res.data.id;
      const result = await stripe.redirectToCheckout({ sessionId: sessionId });

      if (result) {
        console.log("Error:", result.error);
      }
    } catch (error) {
      console.error("Error creating checkout session or redirecting:", error);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`
        ${
          isMobileFixed
            ? "fixed bottom-0 left-0 right-0 z-40 bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.1)] md:hidden"
            : "bg-white p-6 rounded-lg shadow-md md:w-80 lg:w-96 flex-shrink-0"
        }
        flex flex-col
      `}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Order summary
      </h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Original price</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {coupon && (
          <div className="flex justify-between text-gray-700">
            <span>Discount ({coupon.discountPercentage}%)</span>
            <span className="text-red-500">
              -${(subtotal * (coupon.discountPercentage / 100)).toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {!coupon && (
        <div className="mb-4">
          <label
            htmlFor="coupon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Have a coupon?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="coupon"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-1">{couponError}</p>
          )}
        </div>
      )}

      {coupon && (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded-md mb-4 border border-green-200">
          <span className="text-green-700 font-medium flex items-center gap-2">
            <Check size={18} /> Coupon Applied: {coupon.code}
          </span>
          <button
            onClick={handleRemoveCoupon}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <button
        className="w-full py-3 bg-primary text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
        onClick={handlePayment}
      >
        Proceed to Checkout
      </button>

      {!isMobileFixed && (
        <Link
          href="/"
          className="block text-center mt-4 text-primary hover:underline"
        >
          or Continue Shopping &rarr;
        </Link>
      )}

      {isMobileFixed && (
        <div className="flex justify-between items-center mt-3 pt-3 border-t text-xl font-bold text-gray-900">
          <span>
            Total ({totalItems} {totalItems > 1 ? "items" : "item"})
          </span>
          <span>${total.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
