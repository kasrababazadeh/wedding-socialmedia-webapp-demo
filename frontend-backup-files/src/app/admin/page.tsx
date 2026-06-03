// src/app/admin/page.tsx
import Seo from "../../components/common/Seo";
import AdminCoupleTable from "../../components/admin/AdminCoupleTable";
import AdminDonationTable from "../../components/admin/AdminDonationTable";

export default function AdminPage() {
  return (
    <>
      <Seo title="پنل مدیریت – مراسم ازدواج" description="مدیریت زوج‌ها و کمک‌ها" />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">لیست زوج‌ها</h2>
          <AdminCoupleTable />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">لیست کمک‌ها</h2>
          <AdminDonationTable />
        </section>
      </main>
    </>
  );
}
