'use client';

import type { MarketSegment } from '@repo/database';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/design-system/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

const chartConfig = {
  value: {
    label: 'Market Share',
  },
  enterprise: {
    label: 'Enterprise',
    color: 'hsl(var(--chart-1))',
  },
  smb: {
    label: 'SMB',
    color: 'hsl(var(--chart-2))',
  },
  consumer: {
    label: 'Consumer',
    color: 'hsl(var(--chart-3))',
  },
  startup: {
    label: 'Startup',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
};

interface MarketDistributionChartProps {
  data?: MarketSegment[];
}

export function MarketDistributionChart({
  data = [],
}: MarketDistributionChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Target Market Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie data={data} dataKey="value">
              <LabelList
                dataKey="segment"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month{' '}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing market distribution for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
