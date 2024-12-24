import { Button } from '@repo/design-system/components/ui/button';
import { PageContainer } from '@repo/design-system/components/ui/page-container';
import { PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/header';
import ValidationCards from '../components/validations/validation-cards';

export const metadata: Metadata = {
  title: 'Validations',
  description: 'View and manage your idea validations.',
};

export default function ValidationsPage() {
  const mockValidations = [
    {
      id: '1',
      title: 'E-commerce Platform',
      category: 'E-commerce',
      description: 'Validate your e-commerce business idea.',
      metrics: { move: 245, exercise: 46, stand: 8 },
    },
    {
      id: '2',
      title: 'SaaS Application',
      category: 'SaaS',
      description: 'Validate your SaaS application idea.',
      metrics: { move: 300, exercise: 50, stand: 10 },
    },
    {
      id: '3',
      title: 'Mobile App',
      category: 'Mobile',
      description: 'Validate your mobile app idea.',
      metrics: { move: 200, exercise: 30, stand: 5 },
    },
    // Add more mock validations as needed
  ];

  return (
    <>
      <Header pages={['My Vilidity']} page="Validations" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="Validations"
          description="View and manage your idea validations"
          action={
            <Button asChild size="sm" variant="outline">
              <Link href="/">
                <PlusCircle className="h-4 w-4" />
                New Validation
              </Link>
            </Button>
          }
        >
          {/* <EmptyState /> */}
          <ValidationCards />
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockValidations.map((validation) => (
              <div className="aspect-square" key={validation.id}>
                <ValidationCard
                  title={validation.title}
                  category={validation.category}
                  description={validation.description}
                  metrics={validation.metrics}
                />
              </div>
            ))}
          </div> */}
        </PageContainer>
      </div>
    </>
  );
}
