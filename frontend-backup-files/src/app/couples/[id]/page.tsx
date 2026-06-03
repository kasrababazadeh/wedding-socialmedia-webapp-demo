// Remove "use client" — this will be a server component

import Seo from "../../../components/common/Seo";
import CoupleProfileHeader from "../../../components/couples/CoupleProfileHeader";
import DonationList from "../../../components/donations/DonationList";
import { Couple } from "../../../lib/types";

// fallback for dev if needed
const fallbackCouple: Couple = {
  name: "John & Jane",
  story: "Together forever ❤️",
  avatarUrl: "/default-avatar.png",
  album: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
  followers: 120,
  following: 80,
};

interface Props {
  params: { id: string };
}

async function getCouple(id: string): Promise<Couple> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/couples/${id}`, {
      cache: "no-store", // optional: avoid caching in dev
    });
    if (!res.ok) throw new Error("Failed to fetch couple");
    return res.json();
  } catch (err) {
    console.warn("API error, using fallback couple:", err);
    return fallbackCouple;
  }
}

export default async function CoupleProfile({ params }: Props) {
  const { id } = params;
  const couple = await getCouple(id);

  return (
    <>
      <Seo title={`${couple.name} – پروفایل زوج`} description={couple.story} />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <CoupleProfileHeader couple={couple} />

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">آلبوم عکس</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {couple.album?.length > 0 ? (
              couple.album.map((imgUrl, idx) => (
                <img
                  key={imgUrl || idx}
                  src={imgUrl}
                  alt={`عکس ${idx + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))
            ) : (
              <p>هیچ عکسی وجود ندارد.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">کمک‌های دریافتی</h2>
          <DonationList coupleId={id} />
        </section>
      </main>
    </>
  );
}
