'use client';

import { cn } from '@repo/design-system/lib/utils';
import { Progress } from '@repo/design-system/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/design-system/components/ui/tooltip';
import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'full';
  noPadding?: boolean;
  heading?: string;
  description?: string;
  hideHeader?: boolean;
  action?: ReactNode;
  progress?: {
    used: number;
    total: number;
  };
}

const sizeMap = {
  sm: 'max-w-full',
  default: 'max-w-7xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  className,
  size = 'default',
  noPadding = false,
  heading,
  description,
  hideHeader = false,
  action,
  progress,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        !noPadding && 'px-4 py-6 md:px-6 md:py-8',
        sizeMap[size],
        className
      )}
    >
      {!hideHeader && (heading || description || action) && (
        <div className="mb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {heading && (
                <h1 className="font-semibold text-lg tracking-tight">
                  {heading}
                </h1>
              )}
              {description && (
                <p className="text-muted-foreground text-sm">
                  {description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {progress && (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm">Validations</span>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">Remaining validations this month</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(progress.used / progress.total) * 100} 
                        className="h-1.5 w-24"
                      />
                      <span className="text-muted-foreground text-xs">
                        {progress.used}/{progress.total}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {action}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
} 