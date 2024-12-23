import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { PageContainer } from '@repo/design-system/components/ui/page-container';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { AiOutput } from './components/dashboard/ai-output';
import { ValidationForm } from './components/dashboard/validation-form';
import { Header } from './components/header';
import UpgradeBanner from './components/upgrade/banner';

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
      <UpgradeBanner />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="Validate Your Idea"
          description="Use AI-powered analysis to validate and refine your business idea."
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* ValidationForm - 1/3 width */}
              <div className="lg:col-span-4">
                <ValidationForm />
              </div>
              {/* AiOutput - 2/3 width */}
              <div className="lg:col-span-8">
                <AiOutput />
              </div>
            </div>

            {/* Explanation Card */}
            <Card className="relative overflow-hidden">
              <CardContent className="relative p-6">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-6 md:grid-cols-[1fr,auto,1fr,auto,1fr]">
                    {/* Step 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                          <span className="font-semibold">1</span>
                        </div>
                        <h3 className="font-medium">Submit Your Idea</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Share your business concept through our intuitive form
                        with detailed requirements, documentation, and specific
                        market focus areas.
                      </p>
                    </div>

                    {/* Arrow 1 */}
                    <div className="hidden items-center md:flex">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                          <span className="font-semibold">2</span>
                        </div>
                        <h3 className="font-medium">AI Analysis</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Our advanced AI engine analyzes market trends,
                        competition data, and viability metrics using multiple
                        industry-leading data sources.
                      </p>
                    </div>

                    {/* Arrow 2 */}
                    <div className="hidden items-center md:flex">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Step 3 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                          <span className="font-semibold">3</span>
                        </div>
                        <h3 className="font-medium">Comprehensive Report</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Receive detailed validation insights, actionable
                        recommendations, and strategic guidance to optimize and
                        enhance your business idea.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </div>
    </>
  );
}
