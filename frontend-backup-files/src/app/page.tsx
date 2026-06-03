// src/app/page.tsx
import Seo from "../components/common/Seo";
import Image from "next/image";
import Carousel from "../components/common/Carousel";

export default function Home() {
  return (
    <>
      <Seo
        title="خانه – مراسم ازدواج"
        description="به وب‌سایت ما خوش آمدید. اینجا می‌توانید به زوج‌هایی که قصد ازدواج دارند کمک مالی کنید."
      />
      <main className="container mx-auto md:px-20 px-6 py-6">
        {/* Hero Section */}
        <section className="relative flex flex-col md:flex-row items-center">
          {/* Left: Image (60% width) */}
          <div className="w-full md:w-[55%] relative aspect-[4/3] md:mr-auto">
            <Image
              src="/sample.jpg"
              alt="Marriage Support"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          {/* Right: Overlapping Card (50% width with 10% overlap) */}
          <div className="w-full md:w-[50%] md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 z-10 mt-6 md:mt-0">
            <div className="bg-white p-6 shadow-lg rounded-2xl">
              <h2 className="text-2xl font-semibold mb-2">به وب‌سایت ما خوش آمدید</h2>
              <p>
                اینجا می‌توانید به زوج‌هایی که قصد ازدواج دارند کمک مالی کنید.
              </p>
            </div>
          </div>
        </section>
        <Carousel />
        {/* Additional content placeholder */}
        <div className="mt-12">
          {/* TODO: اضافه کردن بخش‌های محتوا مانند برجسته‌ترین زوج‌ها یا اطلاعات بیشتر */}
        </div>
      </main>
    </>
  );
}