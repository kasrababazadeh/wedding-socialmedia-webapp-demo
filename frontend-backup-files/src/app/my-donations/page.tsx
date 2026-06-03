// src/app/my-donations/page.tsx
import Seo from "../../components/common/Seo";
import DonationList from "../../components/donations/DonationList";

export default function MyDonations() {
  return (
    <>
      <Seo title="کمک‌های من – مراسم ازدواج" description="مشاهده کمک‌های مالی که من ارسال کرده‌ام" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">کمک‌های من</h1>
        <DonationList />
      </main>
    </>
  );
}
