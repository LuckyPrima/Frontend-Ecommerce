"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useUserStore } from "../stores/useUserStore";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin-dashboard");
  const isEditProductPage = /^\/products\/[^/]+\/edit$/.test(pathname);
  const isDetailsProductPage = /^\/products\/[^/]+\/details$/.test(pathname);
  const isPublicProductPage = /^\/product\/[^/]+$/.test(pathname);

  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (
    checkingAuth &&
    !isAuthPage &&
    !isAdminPage &&
    !isEditProductPage &&
    !isDetailsProductPage
  ) {
    return <LoadingSpinner />;
  }

  // We want to hide navbar on auth and public product pages (to allow full screen experience)
  const hideNavbar = isAuthPage || isPublicProductPage;
  // Adjust padding if navbar is hidden or it's an admin page
  const contentPaddingClass = hideNavbar ? "" : "pt-20";

  return (
    <>
      {!hideNavbar && (
        <Suspense fallback={<div>Loading navigation...</div>}>
          <Navbar />
        </Suspense>
      )}
      <div className={contentPaddingClass}>{children}</div>
      {!isAuthPage &&
        !isAdminPage &&
        !isEditProductPage &&
        !isDetailsProductPage && <Footer />}
    </>
  );
}
