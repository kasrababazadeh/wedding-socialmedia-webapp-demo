// src/app/about/page.tsx
import Seo from "../../components/common/Seo";

export default function About() {
  return (
    <>
      <Seo title="درباره ما – مراسم ازدواج" description="این وب‌سایت با هدف حمایت از زوج‌های جوان طراحی شده است تا بتوانند برای جشن ازدواج خود کمک‌های مالی دریافت کنند." />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">درباره ما</h1>
        <p>
          این وب‌سایت با هدف حمایت از زوج‌های جوان طراحی شده است تا بتوانند برای جشن ازدواج خود کمک‌های مالی دریافت کنند.
        </p>
      </main>
    </>
  );
}
