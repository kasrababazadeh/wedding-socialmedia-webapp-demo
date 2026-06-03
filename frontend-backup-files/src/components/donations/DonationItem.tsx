// src/components/donations/DonationItem.tsx
import { Donation } from "../../lib/types";

interface Props {
  donation: Donation;
}

export default function DonationItem({ donation }: Props) {
  // Format date into a readable Persian format if needed,
  // or assume the backend gives you a formatted string like "۱۴۰۳/۰۲/۱۰".
  return (
    <li className="bg-white p-4 shadow rounded flex justify-between">
      <div>
        <p className="font-medium">{donation.donorName}</p>
        <p className="text-gray-600 text-sm">تاریخ: {donation.date}</p>
      </div>
      <div className="text-lg font-semibold">{donation.amount.toLocaleString()} تومان</div>
    </li>
  );
}
