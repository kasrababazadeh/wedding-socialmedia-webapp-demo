// app/couples/CouplesClient.tsx
'use client';

import { Couple } from '../../lib/types'; // adjust if needed
import CoupleCard from '../../components/couples/CoupleCard';

interface CouplesClientProps {
  couples: Couple[];
}

const CouplesClient = ({ couples }: CouplesClientProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {couples.map((couple) => (
        <CoupleCard key={couple.id} couple={couple} />
      ))}
    </div>
  );
};

export default CouplesClient;
