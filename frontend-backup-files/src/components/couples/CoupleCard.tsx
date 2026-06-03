// components/couples/CoupleCard.tsx
import { Couple } from '../../lib/types';

interface CoupleCardProps {
  couple: Couple;
}

const CoupleCard = ({ couple }: CoupleCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <img
        src={couple.avatarUrl}
        alt={`${couple.name}'s profile`}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h2 className="text-lg font-semibold mt-2">{couple.name}</h2>
      <p className="text-sm text-gray-500">{couple.slogan}</p>
      <div className="mt-2 text-sm text-gray-600">❤️ {couple.likes} likes</div>
    </div>
  );
};

export default CoupleCard;
