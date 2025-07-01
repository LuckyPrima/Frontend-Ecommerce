"use client";

import { useEffect, useState } from "react";
import CategoryList from "../../../components/CategoryList";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Slider from "../../../components/Slider";
import axios from "../../../lib/axios";
import ProductCard from "../../../components/ProductCard";
import { handleErrorToast } from "../../../utils/toastUtils";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  { href: "/watches", name: "Watches", imageUrl: "/watch.jpg" },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredRes = await axios.get("/product/featured");
        setFeaturedProducts(featuredRes.data);

        const newRes = await axios.get("/product/new");
        setNewProducts(newRes.data);
      } catch (error) {
        handleErrorToast(error, "Failed to load products for homepage.", false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl font-bold mb-6">Explore Our Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryList category={category} key={category.name} />
          ))}
        </div>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl font-bold mb-6">Featured Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No featured products available.
            </p>
          )}
        </div>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl font-bold mb-6">New Arrivals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {newProducts.length > 0 ? (
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No new products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
