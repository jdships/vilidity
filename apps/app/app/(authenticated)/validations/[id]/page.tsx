import { db } from '@repo/database';
import { notFound } from 'next/navigation';
import { Header } from '../../components/header';
import { ValidationProgress } from '../components/validation-results';

interface ValidationPageProps {
  params: {
    id: string;
  };
}

export default async function ValidationPage({ params }: ValidationPageProps) {
  const validation = await db.validation.findUnique({
    where: { id: params.id },
    include: {
      result: true,
      metrics: true,
    },
  });

  if (!validation) {
    notFound();
  }

  return (
    <>
      <Header pages={['Validations']} page={validation.title} />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <ValidationProgress validationId={validation.id} />
      </div>
    </>
  );
}
