// src/components/donations/DonationMethodSelector.tsx
"use client";
import { useState } from "react";
import api from "../../lib/api";

interface Props {
  coupleId: string;
}

export default function DonationMethodSelector({ coupleId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMethodSelect = async (method: string) => {
    setLoading(true);
    setError(null);

    try {
      // فرضاً API: POST /api/donations with body { coupleId, method }
      const res = await api.post("/donations", { coupleId, method });
      // بعد از موفقیت: شاید کاربر را به یک صفحه پرداخت هدایت کنید
      // یا پیغام تشکر نشان دهید
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xs mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      <button
        disabled={loading}
        onClick={() => handleMethodSelect("online")}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50"
      >
        پرداخت آنلاین
      </button>

      <button
        disabled={loading}
        onClick={() => handleMethodSelect("bank")}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded disabled:opacity-50"
      >
        کارت به کارت
      </button>

      <button
        disabled={loading}
        onClick={() => handleMethodSelect("cash")}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded disabled:opacity-50"
      >
        نقدی
      </button>
    </div>
  );
}
