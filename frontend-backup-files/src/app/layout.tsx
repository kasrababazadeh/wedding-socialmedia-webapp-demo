// src/app/layout.tsx
import "../styles/globals.css";
import "../styles/rtl.css";
import { ReactNode } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "../components/common/Layout";

export const metadata = {
  title: "مراسم ازدواج",
  description: "وب‌سایت کمک به زوجین برای دریافت کمک‌های مالی",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-fuchsia-50/40 dark:bg-gray-700 text-gray-800 min-h-screen">
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
