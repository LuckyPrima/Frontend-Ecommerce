import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
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

const CreateProductTab = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: [],
    size: [],
    color: [],
  });

  const { createProduct, loading } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(() => ({ ...newProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        shortDescription: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
        image: [],
        size: [],
        color: [],
      });
    } catch (error) {
      console.log("Error creating product");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setNewProduct((prev) => ({
        ...prev,
        image: [...prev.image, ...images],
      }));
    });
  };

  return (
    <motion.div
      className="bg-slate-200 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-500"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
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
            id="shortDescription"
            name="shortDescription"
            value={newProduct.shortDescription}
            onChange={handleChange}
            rows={1}
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
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            rows={3}
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
            id="price"
            name="price"
            value={newProduct.price}
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
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1 block w-full bg-slate-500 border border-slate-500 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="capitalize bg-gray-700"
              >
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
            Stock Product
          </label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={newProduct.countInStock}
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
            value={newProduct.size.join(", ")}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                size: e.target.value.split(",").map((s) => s.trim()),
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
            {newProduct.color.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...newProduct.color];
                    newColors[index] = e.target.value;
                    setNewProduct({ ...newProduct, color: newColors });
                  }}
                  className="w-10 h-10 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const filtered = newProduct.color.filter(
                      (_, i) => i !== index
                    );
                    setNewProduct({ ...newProduct, color: filtered });
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
                setNewProduct({
                  ...newProduct,
                  color: [...newProduct.color, "#000000"],
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
            htmlFor="image"
            className="block text-sm font-medium text-slate-500"
          >
            Images
          </label>

          <div className="flex items-center gap-4">
            <input
              id="image"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="image"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded shadow hover:bg-blue-700"
            >
              <Upload className="w-5 h-5 inline-block mr-2" />
              Upload Images
            </label>

            <span className="text-sm text-slate-600">
              {newProduct.image.length > 0
                ? `${newProduct.image.length} Image uploaded`
                : "Image not uploaded yet"}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {newProduct.image.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  fill
                  sizes="100%"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm 
          font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="w-5 h-5 mr-2 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductTab;
