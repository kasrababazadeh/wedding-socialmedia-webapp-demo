"use client";

import { useEffect, useState, useMemo } from "react";
import { Donation } from "../../lib/types";
import DonationItem from "./DonationItem";
import { useAuthContext } from "../../contexts/AuthContext";

interface Props {
  coupleId?: string;
}

const fallbackDonations: Donation[] = [
  {
    id: "1",
    donorName: "Ali",
    amount: 50000,
    message: "مبارک باشه!",
    date: new Date().toISOString(),
    coupleId: "123",
  },
  {
    id: "2",
    donorName: "Sara",
    amount: 75000,
    message: "به امید خوشبختی 🥰",
    date: new Date().toISOString(),
    coupleId: "123",
  },
];

export default function DonationList({ coupleId }: Props) {
  const { user } = useAuthContext();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = useMemo(() => {
    if (coupleId) return `/api/donations?coupleId=${coupleId}`;
    if (user) return `/api/donations?donorId=${user.id}`;
    return null;
  }, [coupleId, user]);

  useEffect(() => {
    if (!fetchUrl) return;

    setLoading(true);
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت کمک‌ها");
        return res.json();
      })
      .then((data: Donation[]) => setDonations(data))
      .catch((err) => {
        console.warn("API fallback to test donations:", err.message);
        setError(err.message);
        setDonations(fallbackDonations); // fallback for local dev
      })
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  if (!fetchUrl) {
    return <p className="text-gray-500">ابتدا وارد شوید تا کمک‌های خود را ببینید.</p>;
  }

  if (loading) return <p>در حال بارگذاری...</p>;
  if (donations.length === 0) return <p>هیچ کمکی یافت نشد.</p>;

  return (
    <ul className="space-y-4">
      {donations.map((donation) => (
        <DonationItem key={donation.id} donation={donation} />
      ))}
    </ul>
  );
}
