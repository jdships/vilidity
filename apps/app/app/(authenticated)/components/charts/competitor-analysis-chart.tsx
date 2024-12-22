'use client';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { ChartContainer } from '@repo/design-system/components/ui/chart';

import type { Competitor } from '@repo/database';

interface CompetitorAnalysisChartProps {
  data?: Competitor[];
}

const chartConfig = {
  marketShare: {
    label: 'Market Share',
  },
};

export function CompetitorAnalysisChart({
  data = [],
}: CompetitorAnalysisChartProps) {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="marketShare" fill="fill" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
