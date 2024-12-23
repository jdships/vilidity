import { PageContainer } from '@repo/design-system/components/ui/page-container';
import type { Metadata } from 'next';
import { Header } from '../components/header';
import { UpgradeContent } from '../components/upgrade/upgrade-content';

export const metadata: Metadata = {
  title: 'Upgrade',
  description: 'View and manage your projects.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header pages={['Account']} page="Upgrade" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer>
          <UpgradeContent />
        </PageContainer>
      </div>
    </>
  );
}
