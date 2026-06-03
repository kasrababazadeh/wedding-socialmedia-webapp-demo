// src/app/donate/[coupleId]/page.tsx
"use client";
import Seo from "../../../components/common/Seo";
import DonationMethodSelector from "../../../components/donations/DonationMethodSelector";

interface Props {
  params: { coupleId: string };
}

export default function DonatePage({ params }: Props) {
  const { coupleId } = params;
  return (
    <>
      <Seo title={`کمک به زوج #${coupleId}`} description="انتخاب روش پرداخت برای کمک مالی" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">کمک به زوج شماره {coupleId}</h1>
        <DonationMethodSelector coupleId={coupleId} />
      </main>
    </>
  );
}
