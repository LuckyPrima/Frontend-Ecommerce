import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { handleErrorToast } from "../utils/toastUtils";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  loading: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      if (res && res.data) {
        set({ cart: res.data });
        get().calculateTotals();
      } else {
        set({ cart: [] });
      }
    } catch (error) {
      set({ cart: [] });
      handleErrorToast(
        error,
        "An error occurred while fetching cart items",
        true
      );
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  addToCart: async (productId, quantity) => {
    try {
      const res = await axios.post("/cart", { productId, quantity });
      toast.success("Product added to cart");

      await get().getCartItems();

      get().calculateTotals();
    } catch (error) {
      handleErrorToast(error, "An error occurred while adding to cart", true);
    }
  },

  deleteFromCart: async (cartItemId) => {
    try {
      await axios.delete(`/cart/${cartItemId}`);
      toast.success("Product removed from cart");

      await get().getCartItems();
      get().calculateTotals();
    } catch (error) {
      handleErrorToast(
        error,
        "An error occurred while deleting from cart",
        true
      );
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    try {
      const res = await axios.put(`/cart/${cartItemId}`, { quantity });
      await get().getCartItems();
      get().calculateTotals();
    } catch (error) {
      handleErrorToast(
        error,
        "An error occurred while updating quantity",
        true
      );
    }
  },

  applyCoupon: async (couponCode) => {
    set({ loading: true });
    try {
      const res = await axios.post("/coupon/validate", { code: couponCode });

      const validatedCoupon = {
        code: res.data.code,
        discountPercentage: res.data.discountPercentage,
        id: res.data.id,
      };

      set({ coupon: validatedCoupon, loading: false });
      get().calculateTotals();
      toast.success(res.data.message || "Coupon applied successfully!");
      return true;
    } catch (error) {
      set({ coupon: null, loading: false });
      get().calculateTotals();
      handleErrorToast(
        error,
        error.response?.data?.message || "Failed to apply coupon.",
        false
      );
      return false;
    }
  },

  removeCoupon: async () => {
    set({ coupon: null });
    get().calculateTotals();
    toast.success("Coupon removed successfully!");
    return true;
  },

  checkAndApplyInitialCoupon: async () => {
    try {
      const res = await axios.get("/coupon");
      if (res.data) {
        set({ coupon: res.data });
        get().calculateTotals();
      } else {
        set({ coupon: null });
        get().calculateTotals();
      }
    } catch (error) {
      console.error("Error checking initial coupon:", error);
      set({ coupon: null });
      get().calculateTotals();
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + parseFloat(item.product?.price || 0) * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon && typeof coupon.discountPercentage === "number") {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
