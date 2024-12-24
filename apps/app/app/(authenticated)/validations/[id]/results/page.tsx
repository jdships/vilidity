import { db } from '@repo/database';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { PageContainer } from '@repo/design-system/components/ui/page-container';
import { Progress } from '@repo/design-system/components/ui/progress';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/header';

interface ResultsPageProps {
  params: { id: string };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const id = params?.id;
  if (!id) notFound();

  const validation = await db.validation.findUnique({
    where: { id },
    include: {
      result: true,
      metrics: true,
    },
  });

  if (!validation || !validation.result) {
    notFound();
  }

  const { result } = validation;

  return (
    <>
      <Header pages={['Validations']} page={`${validation.title} Results`} />
      <PageContainer
        heading={validation.title}
        description="AI-powered analysis results for your idea"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Virality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={result.viralityScore} className="h-2" />
                <p className="text-muted-foreground text-sm">
                  {result.viralityScore.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uniqueness Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={result.uniquenessScore} className="h-2" />
                <p className="text-muted-foreground text-sm">
                  {result.uniquenessScore.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Problem Solving Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={result.problemSolvingScore} className="h-2" />
                <p className="text-muted-foreground text-sm">
                  {result.problemSolvingScore.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={result.overallScore} className="h-2" />
                <p className="text-muted-foreground text-sm">
                  {result.overallScore.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {validation.metrics && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="font-medium text-sm">Market Size</p>
                  <p className="font-bold text-2xl">
                    ${validation.metrics.marketSize}M
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">Target Audience</p>
                  <p className="font-bold text-2xl">
                    {validation.metrics.targetAudience}M
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">Competitors</p>
                  <p className="font-bold text-2xl">
                    {validation.metrics.competitorCount}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">Growth Potential</p>
                  <p className="font-bold text-2xl">
                    {validation.metrics.growthPotential}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </PageContainer>
    </>
  );
}
