import { db } from '@repo/database';
import { Button } from '@repo/design-system/components/ui/button';
import { PageContainer } from '@repo/design-system/components/ui/page-container';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/header';
import { ValidationCard } from '../components/validations/validation-cards';

export default async function ValidationsPage() {
  const validations = await db.validation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <Header pages={['Validations']} page="Validations" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="Validations"
          description="View and manage your idea validations"
          action={
            <Button asChild variant="outline" size="sm">
              <Link href="/validate">
                <Plus className="h-4 w-4" />
                New Validation
              </Link>
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {validations.map((validation) => (
              <ValidationCard key={validation.id} validation={validation} />
            ))}
          </div>
        </PageContainer>
      </div>
    </>
  );
}
