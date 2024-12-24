'use client';

import {
  RiBarChartFill,
  RiChat1Fill,
  RiGroupFill,
  RiMegaphoneFill,
} from '@remixicon/react';
import type { Validation } from '@repo/database';
import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ValidationCardProps {
  validation: Validation;
}

export function ValidationCard({ validation }: ValidationCardProps) {
  // Map category to icon
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'saas':
        return RiBarChartFill;
      case 'mobile':
        return RiMegaphoneFill;
      case 'ai/ml':
        return RiChat1Fill;
      default:
        return RiGroupFill;
    }
  };

  const Icon = getIcon(validation.category);

  return (
    <Card className="relative flex flex-col justify-between p-2">
      <div className="relative h-28">
        <ContentPlaceholder />
        <span className="absolute inset-x-0 bottom-0 left-4 flex size-12 translate-y-1/2 items-center justify-center rounded-md border border-neutral-200 bg-white p-1 shadow-sm dark:border-neutral-800 dark:bg-background">
          <Icon className="size-5 text-primary" aria-hidden={true} />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-8 pb-2">
        <div className="flex-1">
          <h3 className="mb-1 font-medium text-base text-foreground">
            {validation.title}
          </h3>
          <dd className="text-neutral-600 text-sm dark:text-neutral-400">
            {validation.description}
          </dd>
        </div>
        <div className="mt-6 mb-4 flex items-center justify-between">
          <span className="text-neutral-500 text-sm dark:text-neutral-500">
            {validation.status.toLowerCase()}
          </span>
          <span
            className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700 text-xs dark:bg-neutral-800 dark:text-neutral-300"
            aria-hidden={true}
          >
            {validation.category}
          </span>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href={`/validations/${validation.id}/results`}>
            View report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function ContentPlaceholder() {
  return (
    <div className="relative h-full overflow-hidden rounded bg-neutral-50 dark:bg-neutral-800">
      <svg
        className="absolute inset-0 h-full w-full stroke-neutral-200 dark:stroke-neutral-700"
        fill="none"
        aria-label="Decorative background pattern"
        role="img"
      >
        <defs>
          <pattern
            id="pattern-2"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-2)" width="100%" height="100%" />
      </svg>
    </div>
  );
}
