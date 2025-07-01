import React from "react";
import { motion } from "framer-motion";
import { Trash, Star, SquarePen, PackageSearch } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import Link from "next/link";
import Image from "next/image";

const ProductTab = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="bg-slate-200 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              In Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Actions
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Update
            </th>
          </tr>
        </thead>

        <tbody className="bg-slate-200 divide-y divide-slate-300">
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-slate-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image[0]}
                      width={500}
                      height={500}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-500">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500">
                  {product.countInStock}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product.id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-slate-300 text-slate-500"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4 align-middle">
                <div className="flex justify-start items-center gap-4">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-400 hover:text-red-800 cursor-pointer"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/admin-dashboard/products/${product.id}/details`}
                    className="text-primary hover:text-blue-800 cursor-pointer"
                  >
                    <PackageSearch className="h-5 w-5" />
                  </Link>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/admin-dashboard/products/${product.id}/edit`}>
                  <div className="text-primary hover:text-blue-800">
                    <SquarePen className="h-5 w-5" />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductTab;
