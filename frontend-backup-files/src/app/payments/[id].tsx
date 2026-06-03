import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Card } from '../../components/common/Card';

interface PersonPayment {
  id: string;
  date: string;
  amount: number;
  status: string;
}

interface PersonPaymentsProps {
  payments: PersonPayment[];
}

export default function PersonPayments({ payments }: PersonPaymentsProps) {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">پرداخت‌های کاربر</h2>
      <div className="space-y-4">
        {payments.map((p) => (
          <Card key={p.id}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>{new Date(p.date).toLocaleDateString('fa-IR')}</div>
              <div>{p.amount.toLocaleString('fa-IR')} تومان</div>
              <div>{p.status}</div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await axios.get(`/payments/user/${id}`);
  return { props: { payments: res.data } };
};