import MainLayout from '@/layout/Layout';
import { DashboardSale } from '@/features/dashboard-sale/DashboardSale';

export default function HomePage() {
  return (
    <MainLayout>
      <DashboardSale />
    </MainLayout>
  );
}
