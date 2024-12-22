'use client';

import {
  Card,
  CardContent,
  CardFooter,
} from '@repo/design-system/components/ui/card';
import { ChartContainer } from '@repo/design-system/components/ui/chart';
import { Separator } from '@repo/design-system/components/ui/separator';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

const data = [
  {
    activity: 'stand',
    value: (8 / 12) * 100,
    label: '8/12 hr',
    fill: 'var(--color-stand)',
  },
  {
    activity: 'exercise',
    value: (46 / 60) * 100,
    label: '46/60 min',
    fill: 'var(--color-exercise)',
  },
  {
    activity: 'move',
    value: (245 / 360) * 100,
    label: '245/360 kcal',
    fill: 'var(--color-move)',
  },
];

export function ActivityChart() {
  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4 pb-2">
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
            data={data}
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
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-xs">Move</div>
            <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
              562
              <span className="font-normal text-muted-foreground text-sm">
                kcal
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-xs">Exercise</div>
            <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
              73
              <span className="font-normal text-muted-foreground text-sm">
                min
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-muted-foreground text-xs">Stand</div>
            <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
              14
              <span className="font-normal text-muted-foreground text-sm">
                hr
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
