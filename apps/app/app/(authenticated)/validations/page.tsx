import { PageContainer } from '@repo/design-system/components/ui/page-container';
import type { Metadata } from 'next';
import { Header } from '../components/header';

export const metadata: Metadata = {
  title: 'Validations',
  description: 'Chat with our AI assistant about your idea validation.',
};

export default function ValidationsPage() {
  return (
    <>
      <Header pages={['My Vilidity']} page="Validations" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer>
          <div>Page</div>
        </PageContainer>
      </div>
    </>
  );
}
