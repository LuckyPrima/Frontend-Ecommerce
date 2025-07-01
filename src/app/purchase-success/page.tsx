"use client";

import React, { useEffect, useState, useRef } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../../stores/useCartStore";
import axios from "../../lib/axios";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  const hasProcessedSession = useRef(false);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      if (hasProcessedSession.current) {
        console.log("DEBUG: Session already processed, skipping.");
        setIsProcessing(false);
        return;
      }

      hasProcessedSession.current = true;

      try {
        console.log(
          "DEBUG: Posting checkout success to backend for sessionId:",
          sessionId
        );
        await axios.post("/payment/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.error("Error posting checkout success to backend:", error);
        setError(error.response?.data?.message || "Failed to finalize order.");
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Processing payment confirmation...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-600 text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Processing Error</h1>
        <p className="mb-4">{error}</p>
        <Link
          href="/cart"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Go Back to Cart
        </Link>
      </div>
    );

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-slate-50 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-primary w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
            Purchase Successful!
          </h1>

          <p className="text-black text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <div className="bg-slate-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order number</span>
              <span className="text-sm font-semibold text-primary">#12345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Estimated delivery</span>
              <span className="text-sm font-semibold text-primary">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              href="/"
              className="w-full bg-slate-300 hover:bg-gray-400 text-primary font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
