import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import axios from '../../utils/api';
import Layout from '../../components/Layout';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

interface Profile {
  id: string;
  name: string;
  profilePhoto: string;
  bannerPhoto: string;
  story: string;
  album: string[]; // Array of image URLs
  liked: boolean;
}

interface ProfilePageProps {
  profile: Profile;
}

export default function ProfilePage({ profile }: ProfilePageProps) {
  const [liked, setLiked] = useState(profile.liked);
  const toggleLike = async () => {
    try {
      await axios.post(`/profiles/${profile.id}/like`);
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {/* Banner Photo */}
      <div className="relative h-48 w-full">
        <Image
          src={profile.bannerPhoto}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-[-64px]">
        <div className="relative h-32 w-32">
          <Image
            src={profile.profilePhoto}
            alt={profile.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-white"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
        <Button onClick={toggleLike} className="mt-2">
          {liked ? 'پسندیده' : 'پسندیدن'}
        </Button>
      </div>

      {/* Story */}
      <section className="mt-8 px-4">
        <h3 className="text-xl font-semibold mb-2">داستان</h3>
        <p className="text-gray-700 whitespace-pre-line">{profile.story}</p>
      </section>

      {/* Album Gallery */}
      {profile.album.length > 0 && (
        <section className="mt-8 px-4">
          <h3 className="text-xl font-semibold mb-4">آلبوم</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.album.map((url) => (
              <div key={url} className="relative h-40 w-full">
                <Image src={url} alt="Album Image" layout="fill" objectFit="cover" className="rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await axios.get(`/profiles/${id}`);
  return { props: { profile: res.data } };
};