'use client';

import { cva } from 'class-variance-authority';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

const buttonVariants = cva('size-7 rounded-full p-1.5 text-muted-foreground', {
  variants: {
    dark: {
      true: 'dark:bg-accent dark:text-accent-foreground',
      false:
        'bg-accent text-accent-foreground dark:bg-transparent dark:text-muted-foreground',
    },
  },
});

export function ModeToggle({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setTheme, resolvedTheme } = useTheme();

  const onToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center rounded-full border p-[3px]',
        className
      )}
      data-theme-toggle=""
      aria-label="Toggle Theme"
      onClick={onToggle}
      {...props}
    >
      <Sun className={cn(buttonVariants({ dark: false }))} />
      <Moon className={cn(buttonVariants({ dark: true }))} />
    </button>
  );
}
