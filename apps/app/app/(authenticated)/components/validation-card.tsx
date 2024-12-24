'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { ChartContainer } from '@repo/design-system/components/ui/chart';
import { ArrowRight } from 'lucide-react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

interface ValidationCardProps {
  title: string;
  category: string;
  description: string;
  metrics: { [key: string]: number };
}

export const ValidationCard = ({
  title,
  category,
  description,
  metrics,
}: ValidationCardProps) => {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between">
          <div>
            <CardTitle className="font-semibold text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 text-muted-foreground text-sm">
              {description}
            </CardDescription>
          </div>
          <Badge className="h-fit" variant="secondary">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-6">
        <ChartContainer
          config={{
            move: {
              label: 'Move',
              color: 'hsl(var(--chart-1))',
            },
            stand: {
              label: 'Stand',
              color: 'hsl(var(--chart-2))',
            },
            exercise: {
              label: 'Exercise',
              color: 'hsl(var(--chart-3))',
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: 'stand',
                value: (metrics.stand / 12) * 100,
                label: '8/12 hr',
                fill: 'var(--color-stand)',
              },
              {
                activity: 'exercise',
                value: (metrics.exercise / 60) * 100,
                label: '46/60 min',
                fill: 'var(--color-exercise)',
              },
              {
                activity: 'move',
                value: (metrics.move / 360) * 100,
                label: '245/360 kcal',
                fill: 'var(--color-move)',
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button className="w-full" variant="default" size="sm">
          View Report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
