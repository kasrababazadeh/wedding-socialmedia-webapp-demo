"use client";

import { useEffect, useState } from "react";
import Seo from "../../components/common/Seo";
import CoupleProfileHeader from "../../components/couples/CoupleProfileHeader";
import DonationList from "../../components/donations/DonationList";
import { Couple } from "../../lib/types";
import { useAuthContext } from "../../contexts/AuthContext"; // adjust path as needed


const fallbackCouple: Couple = {
  name: "John & Jane",
  story: "Together forever ❤️",
  avatarUrl: "/default-avatar.png",
  album: ["/registerstep1.jpg", "/registerstep2.jpg", "/sample4.jpg", "/couple3.png"],
  followers: 120,
  following: 80,
};

interface Props {
  slug: string;
}

async function getCouple(slug: string): Promise<Couple> {
  try {
    const res = await fetch(`http://localhost:8000/api/couples/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch couple");
    return res.json();
  } catch (err) {
    console.warn("API error, using fallback couple:", err);
    return fallbackCouple;
  }
}

export default function CoupleProfile({ slug }: Props) {
  const [selectedTab, setSelectedTab] = useState<"album" | "donations">("album");
  const [couple, setCouple] = useState<Couple | null>(null);
  console.log("couple: ", couple);
  const { user } = useAuthContext();
  console.log("user: ", user);
  const isOwner = user?.id === couple?.user_id;
  console.log("user?.id: ", user?.id);
  console.log("couple?.id: ", couple?.user_id);
  console.log("isOwner: ", isOwner);
  // const isOwner = true;


  useEffect(() => {
    getCouple(slug).then(setCouple);
  }, [slug]);


  if (!couple) return <p>در حال بارگذاری پروفایل...</p>;

  return (
    <>
      <Seo title={`${couple.name} – پروفایل زوج`} description={couple.story} />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <CoupleProfileHeader couple={couple} />

        {/* Tab buttons */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setSelectedTab("album")}
            className={`w-1/2 pb-2 font-semibold ${
              selectedTab === "album" ? "border-b-2 border-pink-500 text-pink-600" : "text-gray-500"
            }`}
          >
            آلبوم عکس
          </button>
          <button
            onClick={() => setSelectedTab("donations")}
            className={`w-1/2 pb-2 font-semibold ${
              selectedTab === "donations" ? "border-b-2 border-pink-500 text-pink-600" : "text-gray-500"
            }`}
          >
            کمک‌های دریافتی
          </button>
        </div>

        {/* Tab content */}
        {selectedTab === "album" && (
          <section>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              {Array.isArray(couple.album) && couple.album.length > 0 ? (
                <>
                  {couple.album.map((imgUrl, idx) => (
                    <img
                      key={imgUrl || idx}
                      src={imgUrl}
                      alt={`عکس ${idx + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                  {/* Only show add tile if it's the owner's page */}
                  {isOwner && (
                    <div
                      onClick={() => alert("Open upload form here")}
                      className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-pink-400 rounded-lg cursor-pointer hover:bg-pink-50 transition"
                    >
                      <span className="text-4xl text-pink-500">+</span>
                    </div>
                  )}
                </>
              ) : (
                isOwner ? (
                  // No images, but show uploader
                  <div
                    onClick={() => alert("Open upload form here")}
                    className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-pink-400 rounded-lg cursor-pointer hover:bg-pink-50 transition"
                  >
                    <span className="text-4xl text-pink-500">+</span>
                  </div>
                ) : (
                  <p>هیچ عکسی وجود ندارد.</p>
                )
              )}
            </div>
          </section>
        )}
        

        {selectedTab === "donations" && (
          <section>
            <DonationList coupleId={slug} />
          </section>
        )}
      </main>
    </>
  );
}
