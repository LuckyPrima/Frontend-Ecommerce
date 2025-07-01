"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react"; // Import useRef
import CartModal from "./CartModal";
import {
  ShoppingCart,
  CircleUser,
  UserPlus,
  LogIn,
  Lock,
  LogOut,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const truncateTextAfterWords = (text, numWords) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= numWords) {
    return text;
  }
  return words.slice(0, numWords).join(" ");
};

const NavIcons = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart, getCartItems } = useCartStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);

  useEffect(() => {
    if (!!user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  const handleCartMouseEnter = () => {
    clearTimeout(cartTimeoutRef.current);
    setIsCartOpen(true);
  };

  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 200);
  };

  const handleProfileMouseEnter = () => {
    clearTimeout(profileTimeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {isAdmin && (
        <Link
          href="/admin-dashboard"
          className="relative w-full h-8 p-4 bg-primary rounded-md text-white hover:bg-white hover:text-primary ring-1 hover:ring-primary text-sm flex items-center justify-center"
        >
          <Lock className="inline-block mr-1" size={18} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      )}

      {user && (
        <div
          className="relative cursor-pointer"
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
        >
          <ShoppingCart size={22} />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
            {cart.length}
          </div>
          {isCartOpen && <CartModal />}
        </div>
      )}

      {user ? (
        <div
          className="relative cursor-pointer"
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <div className="flex gap-1 items-center">
            <CircleUser size={25} strokeWidth={1.8} />
            {truncateTextAfterWords(user.name, 1)}
          </div>
          {isProfileOpen && (
            <div className="absolute p-4 rounded-md top-12 right-0 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.2)] bg-white z-20">
              <div
                className="mt-2 text-md cursor-pointer flex items-center gap-2"
                onClick={handleLogout}
              >
                Logout
                <LogOut size={18} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/auth/signup"
            className="relative w-full h-8 p-4 bg-primary rounded-md text-white hover:bg-white hover:text-primary border-solid ring-1 hover:ring-primary text-sm flex items-center justify-center"
          >
            <UserPlus className="mr-2" size={18} />
            <span>SignUp</span>
          </Link>
          <Link
            href="/auth/login"
            className="relative w-full h-8 p-4 bg-white rounded-md text-primary hover:bg-primary hover:text-white border-solid ring-1 hover:ring-primary text-sm flex items-center justify-center"
          >
            <LogIn className="mr-2" size={18} />
            <span>login</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavIcons;
