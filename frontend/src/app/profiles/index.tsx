import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Card } from '../../components/common/Card';

interface ProfileSummary {
  id: string;
  name: string;
  profilePhoto: string;
}

interface ProfilesPageProps {
  profiles: ProfileSummary[];
}

export default function ProfilesPage({ profiles }: ProfilesPageProps) {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">همه پروفایل‌ها</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <Link key={p.id} href={`/profiles/${p.id}`}>
            <a>
              <Card>
                <div className="flex flex-col items-center">
                  <img
                    src={p.profilePhoto}
                    alt={p.name}
                    className="h-24 w-24 rounded-full mb-2 object-cover"
                  />
                  <h3 className="text-lg font-medium">{p.name}</h3>
                </div>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('/profiles');
  return { props: { profiles: res.data } };
};