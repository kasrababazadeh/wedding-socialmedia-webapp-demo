// app/couples/[slug]/print/page.tsx
import Image from "next/image";

async function getCouple(slug: string) {
  const res = await fetch(`http://localhost:8000/api/couples/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load couple data");
  return res.json();
}

export default async function CouplePrintPage({ params }: { params: { slug: string } }) {
  const couple = await getCouple(params.slug);

  return (
    <div className="p-10 print:p-0 flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">{couple.partner1_forename} & {couple.partner2_forename}</h1>
      <p className="mb-4 text-center text-gray-700 max-w-md">
        اسکن کد QR برای مشاهده پروفایل زوج
      </p>
      {couple.qr_url && (
        <img
          src={couple.qr_url}
          alt="QR Code"
          width={250}
          height={250}
          className="rounded shadow-lg"
        />
            
      )}
      <p className="mt-6 text-sm text-gray-500">www.yourdomain.com/couple/{couple.slug}</p>
    </div>
  );
}
