// src/app/donations/[coupleId]/page.tsx
import Seo from "../../../components/common/Seo";
import DonationList from "../../../components/donations/DonationList";

interface Props {
  params: { coupleId: string };
}

export default function CoupleDonations({ params }: Props) {
  const { coupleId } = params;
  return (
    <>
      <Seo title={`کمک‌های دریافتی زوج #${coupleId}`} description="مشاهده کمک‌های مالی ارسالی به این زوج" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">کمک‌های دریافتی زوج شماره {coupleId}</h1>
        <DonationList coupleId={coupleId} />
      </main>
    </>
  );
}
