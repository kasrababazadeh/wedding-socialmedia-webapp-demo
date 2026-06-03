// components/couples/CoupleProfileHeader.tsx

import { Couple } from "../../lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  couple: Couple;
}

export default function CoupleProfileHeader({ couple }: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-between p-4 lg:p-8 gap-8">
      {/* Left section: Avatar + Bio */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
        <img
          src={couple.avatarUrl}
          alt={couple.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
        />
        <div className="text-center md:text-right">
          <h1 className="text-2xl font-bold">{couple.name}</h1>
          <p className="text-gray-600">{couple.story}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span><strong>{couple.followers}</strong> دنبال‌کننده</span>
            <span><strong>{couple.following}</strong> دنبال‌شونده</span>
          </div>
        </div>
      </div>

      {/* Right section: QR Code */}
      {couple.qr_url && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={couple.qr_url}
            alt="QR Code"
            width={180}
            height={180}
            className="rounded shadow-lg"
          />
          <Link
            href={`/couples/${couple.slug}/print`}
            className="text-sm border mt-2 px-3 py-1 rounded hover:bg-gray-100"
          >
            Print beautifully
          </Link>
        </div>
      )}
    </div>
  );
}
