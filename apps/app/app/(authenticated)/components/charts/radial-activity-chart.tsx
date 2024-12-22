'use client';

import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { ChartContainer } from '@repo/design-system/components/ui/chart';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

export function RadialActivityChart() {
  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-sm">Move</div>
            <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
              562/600
              <span className="font-normal text-muted-foreground text-sm">
                kcal
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-sm">Exercise</div>
            <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
              73/120
              <span className="font-normal text-muted-foreground text-sm">
                min
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-sm">Stand</div>
            <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
              8/12
              <span className="font-normal text-muted-foreground text-sm">
                hr
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            move: {
              label: 'Move',
              color: 'hsl(var(--chart-1))',
            },
            exercise: {
              label: 'Exercise',
              color: 'hsl(var(--chart-2))',
            },
            stand: {
              label: 'Stand',
              color: 'hsl(var(--chart-3))',
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              margin={{
                left: -10,
                right: -10,
                top: -10,
                bottom: -10,
              }}
              data={[
                {
                  activity: 'stand',
                  value: (8 / 12) * 100,
                  fill: 'var(--color-stand)',
                },
                {
                  activity: 'exercise',
                  value: (46 / 60) * 100,
                  fill: 'var(--color-exercise)',
                },
                {
                  activity: 'move',
                  value: (245 / 360) * 100,
                  fill: 'var(--color-move)',
                },
              ]}
              innerRadius="20%"
              barSize={24}
              startAngle={90}
              endAngle={450}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                dataKey="value"
                tick={false}
              />
              <RadialBar dataKey="value" background cornerRadius={5} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
