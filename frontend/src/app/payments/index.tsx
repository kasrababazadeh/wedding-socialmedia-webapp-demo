import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

interface PaymentMethod {
  id: string;
  name: string;
  details: string;
}

interface ProfileInfo {
  id: string;
  name: string;
  profilePhoto: string;
}

interface PaymentsPageProps {
  profile: ProfileInfo;
  methods: PaymentMethod[];
}

export default function PaymentsPage({ profile, methods }: PaymentsPageProps) {
  return (
    <Layout>
      {/* Profile Header */}
      <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-6">
        <img
          src={profile.profilePhoto}
          alt={profile.name}
          className="h-16 w-16 rounded-full object-cover ml-4"
        />
        <h3 className="text-xl font-semibold">{profile.name}</h3>
      </div>

      {/* Payment Methods List */}
      <h2 className="text-2xl font-bold mb-4">روش‌های پرداخت</h2>
      <div className="space-y-4">
        {methods.map((method) => (
          <Card key={method.id}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium">{method.name}</h4>
                <p className="text-gray-600">{method.details}</p>
              </div>
              <Button>پرداخت با {method.name}</Button>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profileRes = await axios.get('/profiles/me');
  const methodsRes = await axios.get('/payment-methods');
  return {
    props: { profile: profileRes.data, methods: methodsRes.data },
  };
};