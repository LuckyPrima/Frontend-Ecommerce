"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Trash2, Upload, RefreshCw } from "lucide-react";
import { useProductStore } from "../../../../../stores/useProductStore";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { useUserStore } from "../../../../../stores/useUserStore";
import Image from "next/image";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
  "watches",
];

const ProductEdit = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, checkingAuth } = useUserStore();
  const {
    fetchProductById,
    updateProduct,
    currentProduct,
    loading,
    deleteProductImage,
  } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    images: [],
    sizes: [],
    colors: [],
  });

  useEffect(() => {
    if (!checkingAuth && user?.role !== "admin") {
      router.replace("/auth/login");
    }
  });

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || "",
        shortDescription: currentProduct.shortDescription || "",
        description: currentProduct.description || "",
        price: currentProduct.price || 0,
        category: currentProduct.category || "",
        countInStock: currentProduct.countInStock || 0,
        images: Array.isArray(currentProduct.image)
          ? currentProduct.image
          : currentProduct.image
          ? [currentProduct.image]
          : [],
        sizes: Array.isArray(currentProduct.size) ? currentProduct.size : [],
        colors: Array.isArray(currentProduct.color) ? currentProduct.color : [],
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, {
      ...formData,
      image: formData.images,
      size: formData.sizes,
      color: formData.colors,
    });
    // router.push("/admin-dashboard");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, reader.result],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  if (loading || !currentProduct) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-slate-200 rounded-lg shadow-lg">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mt-6 mb-6 text-primary hover:text-blue-900"
      >
        <ChevronLeft />
        <span>Back To Dashboard</span>
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold mb-6 text-primary"
      >
        Edit Product
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-500"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-slate-500"
          >
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-500"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-slate-500"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step={0.01}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-500"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="countInStock"
            className="block text-sm font-medium text-slate-500"
          >
            In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            step={1}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sizes"
            className="block text-sm font-medium text-slate-500"
          >
            Sizes
          </label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            placeholder="e.g., S, M, L, XL"
          />
        </div>

        <div>
          <label
            htmlFor="colors"
            className="block text-sm font-medium text-slate-500"
          >
            Colors
          </label>
          <div className="flex flex-col gap-2">
            {formData.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...formData.colors];
                    newColors[index] = e.target.value;
                    setFormData({ ...formData, colors: newColors });
                  }}
                  className="w-10 h-10 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const filtered = formData.colors.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, colors: filtered });
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  colors: [...formData.colors, "#000000"],
                })
              }
              className="text-blue-500 hover:underline text-sm"
            >
              + Add Color
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-slate-500"
          >
            Images
          </label>
          <div className="flex items-center gap-4">
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="images"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded shadow hover:bg-blue-700"
            >
              <Upload className="w-5 h-5 inline-block mr-2" />
              Upload Images
            </label>

            <span className="text-sm text-slate-600">
              {formData.images.length > 0
                ? `${formData.images.length} Image uploaded`
                : "Image not uploaded yet"}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  className="w-full h-32 object-cover rounded"
                  width={200}
                  height={200}
                />
                <button
                  type="button"
                  onClick={async () => {
                    deleteProductImage(id, index);
                    setFormData((prev) => {
                      const updated = [...prev.images];
                      updated.splice(index, 1);
                      return { ...prev, images: updated };
                    });
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <RefreshCw />
          Update Product
        </button>
      </motion.form>
    </div>
  );
};

export default ProductEdit;
