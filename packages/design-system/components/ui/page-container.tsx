'use client';

import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'full';
  noPadding?: boolean;
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
      {children}
    </div>
  );
} 