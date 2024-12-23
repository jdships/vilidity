import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { PageContainer } from '@repo/design-system/components/ui/page-container';
import { PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/header';

export const metadata: Metadata = {
  title: 'Validations',
  description: 'View and manage your idea validations.',
};

export default function ValidationsPage() {
  return (
    <>
      <Header pages={['My Vilidity']} page="Validations" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="Validations"
          description="View and manage your idea validations"
          action={
            <Button asChild size="sm">
              <Link href="/">
                <PlusCircle className="h-4 w-4" />
                New Validation
              </Link>
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="aspect-square p-6">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">Validation #{i + 1}</h3>
                    <p className="text-muted-foreground text-sm">
                      Sample validation description...
                    </p>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Created 2 days ago
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </PageContainer>
      </div>
    </>
  );
}
