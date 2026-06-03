// src/components/common/Layout.tsx
"use client";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-grow min-h-[90vh] pt-20">{children}</main>
      <Footer />
    </div>
  );
}
