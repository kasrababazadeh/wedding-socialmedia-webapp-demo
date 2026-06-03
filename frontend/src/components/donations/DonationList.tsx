"use client";

import { useEffect, useState } from "react";
import { Donation } from "../../lib/types";
import DonationItem from "./DonationItem";

interface Props {
  coupleId?: string;
}

const mockDonations: Donation[] = [
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
  {
    id: "3",
    donorName: "Reza",
    amount: 100000,
    message: "به امید روزهای روشن ❤️",
    date: new Date().toISOString(),
    coupleId: "123",
  },
];

export default function DonationList({ coupleId }: Props) {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // simulate loading from a mock source
    setTimeout(() => {
      setDonations(mockDonations);
    }, 500); // Optional fake delay
  }, []);

  return (
    <ul className="space-y-4">
      {donations.map((donation) => (
        <DonationItem key={donation.id} donation={donation} />
      ))}
    </ul>
  );
}
