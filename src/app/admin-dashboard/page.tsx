"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";

import CreateProductTab from "../../components/CreateProductTab";
import ProductTab from "../../components/ProductTab";
import AnalyticsTab from "../../components/AnalyticsTab";
import { useProductStore } from "../../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const { user, checkingAuth } = useUserStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    if (!checkingAuth && user?.role !== "admin") {
      router.replace("/auth/login");
    }
  }, [checkingAuth, user, router]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (checkingAuth || user?.role !== "admin") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-black relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white ring-1 ring-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductTab />}
        {activeTab === "products" && <ProductTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
