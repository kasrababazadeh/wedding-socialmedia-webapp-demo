// src/app/couples/page.tsx
import Seo from "../../components/common/Seo";
import CouplesClient from "./CouplesClient";
import { getAllCouples } from '../../lib/api';

const mockCouples = [
  {
    id: "1",
    name: 'Ali & Sara',
    slogan: 'Together forever ❤️',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Ali+%26+Sara',
    likes: 120,
  },
  {
    id: "2",
    name: 'John & Mary',
    slogan: 'Love across oceans 🌊',
    avatarUrl: 'https://via.placeholder.com/300x200?text=John+%26+Mary',
    likes: 95,
  },
  {
    id: "3",
    name: 'Omar & Lina',
    slogan: 'Built on trust 🤝',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Omar+%26+Lina',
    likes: 180,
  },
  {
    id: "3",
    name: 'Omar & Lina',
    slogan: 'Built on trust 🤝',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Omar+%26+Lina',
    likes: 180,
  },
  {
    id: "3",
    name: 'Omar & Lina',
    slogan: 'Built on trust 🤝',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Omar+%26+Lina',
    likes: 180,
  },
  {
    id: "3",
    name: 'Omar & Lina',
    slogan: 'Built on trust 🤝',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Omar+%26+Lina',
    likes: 180,
  },
  {
    id: "3",
    name: 'Omar & Lina',
    slogan: 'Built on trust 🤝',
    avatarUrl: 'https://via.placeholder.com/300x200?text=Omar+%26+Lina',
    likes: 180,
  },
];

export default async function Couples() {
  // const couples = await getAllCouples();
  return (
    <>
      <Seo title="تمام زوج‌ها – مراسم ازدواج" description="لیست تمامی زوج‌های ثبت‌نام‌کرده" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-center font-semibold mb-6">تمام زوج‌ها</h1>
        {/* <CouplesClient couples={couples} /> */}
        <CouplesClient couples={mockCouples} />
      </main>
    </>
  );
}
