import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ThreadProps = {
  children: ReactNode;
  className?: string;
};

export const Thread = ({ children, className }: ThreadProps) => (
  <div className={twMerge('flex flex-col gap-3', className)}>{children}</div>
);
