// 'use client';

import { RiAddFill } from '@remixicon/react';

import { Button } from '@repo/design-system/components/ui/button';

export default function EmptyState() {
  return (
    <>
      <div className="relative">
        <ul
          role="list"
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li className="h-44 rounded-lg border bg-secondary/50" />
          <li className="h-44 rounded-lg border bg-secondary/50" />
          <li className="hidden h-44 rounded-lg border bg-secondary/50 sm:block" />
          <li className="hidden h-44 rounded-lg border bg-secondary/50 sm:block" />
          <li className="hidden h-44 rounded-lg border bg-secondary/50 sm:block " />
          <li className="hidden h-44 rounded-lg border bg-secondary/50 sm:block" />
        </ul>
        {/* Change dark:from-neutral-950 in parent below according to your dark mode background */}
        <div className="absolute inset-x-0 bottom-0 flex h-32 flex-col items-center justify-center bg-gradient-to-t from-white to-transparent dark:from-neutral-950">
          <p className="font-medium text-neutral-900 dark:text-neutral-50">
            No validations created yet
          </p>
          <p className="mt-2 text-neutral-500 text-sm dark:text-neutral-500">
            Create your first validation to get started
          </p>
          <Button className="mt-6 gap-1" size="sm">
            <RiAddFill className="-ml-1 size-5 shrink-0" aria-hidden={true} />
            Validate Your First Idea
          </Button>
        </div>
      </div>
    </>
  );
}
