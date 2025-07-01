"use client";

import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "../../stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CancelPage = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-50 rounded-lg shadow-xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="bg-slate-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 text-center">
              If you encountered any issues during the checkout process, please
              {"don't"} hesitate to contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPage;
