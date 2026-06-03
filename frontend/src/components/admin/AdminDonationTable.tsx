// src/components/admin/AdminDonationTable.tsx
import React from "react";
import { Donation } from "../../lib/types";

interface Props {
  donations: (Donation & { coupleName: string })[];
}

export default function AdminDonationTable({ donations }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="text-right bg-gray-100">
            <th className="px-4 py-2">شناسه</th>
            <th className="px-4 py-2">نام دهنده</th>
            <th className="px-4 py-2">مبلغ</th>
            <th className="px-4 py-2">زوج</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((don) => (
            <tr key={don.id} className="border-t">
              <td className="px-4 py-2">{don.id}</td>
              <td className="px-4 py-2">{don.donorName}</td>
              <td className="px-4 py-2">{don.amount.toLocaleString()} تومان</td>
              <td className="px-4 py-2">{don.coupleName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
