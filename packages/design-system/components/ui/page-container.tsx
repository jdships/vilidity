'use client';

import { cn } from '@repo/design-system/lib/utils';
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
            {action && <div>{action}</div>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
} 