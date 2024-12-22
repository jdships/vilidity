'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Progress } from '@repo/design-system/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import { CheckCircle, Info, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function PlanUsage() {
  // TODO: Replace with actual usage data
  const planName = 'Single Validation';
  const daysLeft = 12;

  // Validations usage
  const usedValidations = 0;
  const totalValidations = 1;

  // Messages usage
  const usedMessages = 5;
  const totalMessages = 20;

  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <CardHeader className="p-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium text-sm">Plan</CardTitle>
          <Badge variant="secondary" className="font-normal text-xs">
            {planName}
          </Badge>
        </div>
      </CardHeader>
      <div className="mt-1 mb-4 text-muted-foreground text-xs">
        {daysLeft} days left in billing period
      </div>
      <CardContent className="space-y-4 p-0">
        {/* Validations Progress */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-xs">Validations</span>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={4}>
                  <p className="text-xs">
                    Full idea validations with outputs and insights
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-muted-foreground text-xs">
              {usedValidations}/{totalValidations}
            </span>
          </div>
          <Progress
            value={(usedValidations / totalValidations) * 100}
            className="mt-2 h-1"
          />
        </div>

        {/* Messages Progress */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="font-medium text-xs">AI Messages</span>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={4}>
                  <p className="text-xs">
                    Messages for iteration with Validity AI
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-muted-foreground text-xs">
              {usedMessages}/{totalMessages}
            </span>
          </div>
          <Progress
            value={(usedMessages / totalMessages) * 100}
            className="mt-2 h-1"
          />
        </div>

        {/* Top-up Options */}
        <div className="hidden space-y-2 border-t pt-3 sm:block">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Extra validation</span>
            </div>
            <span className="font-medium">$5</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>50 AI credits</span>
            </div>
            <span className="font-medium">$5</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <Link
            href="/billing-and-usage"
            className="w-full rounded-md border border-border px-3 py-2 text-center font-medium text-xs transition-colors hover:bg-secondary"
          >
            Purchase Credits
          </Link>
          <Link
            href="/upgrade"
            className="group relative w-full overflow-hidden rounded-md bg-primary px-3 py-2 text-center font-medium text-primary-foreground text-xs transition-colors hover:bg-primary/90"
          >
            <span className="relative z-10">Upgrade to Explorer</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="h-[200%] w-[40%] rotate-12 transform bg-white/10 blur-md" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
