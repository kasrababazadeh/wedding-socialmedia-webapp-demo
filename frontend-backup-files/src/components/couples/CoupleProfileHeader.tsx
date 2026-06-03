// components/couples/CoupleProfileHeader.tsx
import { Couple } from "../../lib/types";

interface Props {
  couple: Couple;
}

export default function CoupleProfileHeader({ couple }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <img
        src={couple.avatarUrl}
        alt={couple.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold">{couple.name}</h1>
        <p className="text-gray-600">{couple.story}</p>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          <span><strong>{couple.followers}</strong> دنبال‌کننده</span>
          <span><strong>{couple.following}</strong> دنبال‌شونده</span>
        </div>
      </div>
    </div>
  );
}
