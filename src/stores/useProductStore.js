import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  currentProduct: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/product", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/product");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  fetchProductById: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/product/${productId}`);
      console.log("Fetched:", response.data);
      set({ currentProduct: response.data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/product/category/${category}`);
      console.log(
        "API Response for category (after backend fix):",
        response.data
      );
      set({
        products: response.data.products,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/product/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product.id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },

  deleteProductImage: async (productId, imageIndex) => {
    try {
      const res = await axios.delete(`/product/${productId}/image`, {
        data: { imageIndex: imageIndex },
      });
      set((state) => ({
        currentProduct: { ...state.currentProduct, image: res.data.images },
      }));
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Failed to delete image", err);
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/product/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product.id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },

  updateProduct: async (productId, productData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/product/${productId}`, productData);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product.id === productId ? response.data : product
        ),
        loading: false,
      }));
      toast.success("Product updated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
}));
