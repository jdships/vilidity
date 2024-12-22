import { PageContainer } from '@repo/design-system/components/ui/page-container';
import type { Metadata } from 'next';
import { Header } from './components/header';
import { PlanUsage } from './components/plan-usage';

const title = 'Dashboard';
const description = 'Your AI-powered idea validation dashboard.';

export const metadata: Metadata = {
  title,
  description,
};
export default function DashboardPage() {
  return (
    <>
      <Header pages={['Platform']} page="Validate" />
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <PageContainer>
          <div className="relative min-h-[400px]">
            <PlanUsage />
          </div>
        </PageContainer>
      </div>
    </>
  );
}
