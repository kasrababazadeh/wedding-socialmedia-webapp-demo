// src/components/admin/AdminCoupleTable.tsx
import React from "react";
import { Couple } from "../../lib/types";

interface Props {
  couples: Couple[];
}

export default function AdminCoupleTable({ couples }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="text-right bg-gray-100">
            <th className="px-4 py-2">شناسه</th>
            <th className="px-4 py-2">نام زوج</th>
            <th className="px-4 py-2">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {couples.map((couple) => (
            <tr key={couple.id} className="border-t">
              <td className="px-4 py-2">{couple.id}</td>
              <td className="px-4 py-2">{couple.name}</td>
              {/* Assuming your API returns a createdAt field; if not, show a placeholder */}
              <td className="px-4 py-2">{/* YYYY/MM/DD */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
