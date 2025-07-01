"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCartStore();
  const { user, logout } = useUserStore();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const handleLogoutAndCloseMenu = () => {
    logout();
    setOpen(false);
  };

  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/" onClick={() => setOpen(false)}>
            Homepage
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin-dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              )}
              <Link href="/cart" onClick={() => setOpen(false)}>
                Cart ({cart.length})
              </Link>
              <span
                className="cursor-pointer"
                onClick={handleLogoutAndCloseMenu}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
