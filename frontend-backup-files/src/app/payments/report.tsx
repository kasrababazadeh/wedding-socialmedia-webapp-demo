import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Card } from '../../components/common/Card';

interface PaymentReportItem {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

interface ReportPageProps {
  report: PaymentReportItem[];
}

export default function ReportPage({ report }: ReportPageProps) {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">گزارش پرداخت‌ها</h2>
      <div className="space-y-4">
        {report.map((item) => (
          <Card key={item.id}>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>{new Date(item.date).toLocaleDateString('fa-IR')}</div>
              <div>{item.amount.toLocaleString('fa-IR')} تومان</div>
              <div>{item.method}</div>
              <div>{item.status}</div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('/payments/report');
  return { props: { report: res.data } };
};