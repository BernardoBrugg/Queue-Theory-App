"use client";

import { Nav } from "../components/Nav";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../components/AuthContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Nav />
      <div className="pt-16">{children}</div>
      <Footer />
      <ToastContainer />
    </AuthProvider>
  );
}
