import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import {
  LoaderIcon,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, isValid, parseISO } from "date-fns";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);

        const fetchedData = response.data.dailySalesData || [];
        setDailySalesData(fetchedData);

        // console.log("Fetched analytics data:", response.data.analyticsData);
        // console.log("Fetched daily sales data:", fetchedData);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoaderIcon className="animate-spin text-primary w-10 h-10" />
        Loading analytics data...
      </div>
    );

  return (
    <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-blue-500 to-sky-500"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-blue-500 to-sky-500"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-blue-500 to-sky-500"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$ ${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-blue-500 to-sky-500"
        />
      </div>

      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg h-[450px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Sales & Revenue Overview
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          {dailySalesData && dailySalesData.length > 0 ? (
            <LineChart
              data={dailySalesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#666"
                tickFormatter={(tick) => {
                  const date = parseISO(tick);
                  return isValid(date) ? format(date, "MMM dd") : "";
                }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                yAxisId="left"
                stroke="#666"
                label={{
                  value: "Sales",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#666",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#666"
                label={{
                  value: "Revenue",
                  angle: 90,
                  position: "insideRight",
                  fill: "#666",
                }}
              />
              <Tooltip />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                activeDot={{ r: 8 }}
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </LineChart>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
              <p className="text-gray-500">
                No daily sales data available to display chart.
              </p>
            </div>
          )}
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-white rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-gray-500 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-gray-800 text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-10" />
    <div className="absolute -bottom-4 -right-4 text-blue-800 opacity-20">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
