'use client';

import { useAuth } from '@repo/auth/client';
import { Button } from '@repo/design-system/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import { DialogTitle } from '@repo/design-system/components/ui/dialog';
import {
  CircleCheckBig,
  FileCheck,
  HelpCircle,
  History,
  MessageCircleMore,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

const actions = [
  {
    title: 'Validate',
    icon: CircleCheckBig,
    href: '/',
  },
  {
    title: 'Chat',
    icon: MessageCircleMore,
    href: '/chat',
  },
] as const;

const recentProjects = [
  {
    title: 'E-commerce Platform',
    href: '/validations/1',
  },
  {
    title: 'Mobile App Idea',
    href: '/validations/2',
  },
  {
    title: 'SaaS Product',
    href: '/validations/3',
  },
] as const;

const navigation = [
  {
    title: 'Validations',
    href: '/validations',
    icon: FileCheck,
  },
  {
    title: 'Chat History',
    href: '/history',
    icon: History,
  },
  {
    title: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
  },
] as const;

interface CommandMenuProps {
  className?: string;
}

export function CommandMenu({ className }: CommandMenuProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const { isLoaded } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleNavigate = async (href: string) => {
    try {
      setIsNavigating(true);
      await router.push(href);
    } catch (error) {
    } finally {
      setIsNavigating(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start gap-1 rounded-md border-bg-sidebar-accent bg-background pl-2 text-muted-foreground text-sm hover:bg-sidebar-accent"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-sidebar-accent px-1.5 font-medium font-mono text-[10px] opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">
          Search commands and navigation
        </DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            {actions.map(({ title, icon: Icon, href }) => (
              <CommandItem
                className="rounded-md hover:bg-sidebar-accent"
                key={href}
                onSelect={() => {
                  handleNavigate(href);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Navigation">
            {navigation.map(({ title, href, icon: Icon }) => (
              <CommandItem
                className="rounded-md hover:bg-sidebar-accent"
                key={href}
                onSelect={() => {
                  handleNavigate(href);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recent Projects">
            {recentProjects.map(({ title, href }) => (
              <CommandItem
                className="rounded-md hover:bg-sidebar-accent"
                key={href}
                onSelect={() => {
                  handleNavigate(href);
                }}
              >
                <History className="mr-2 h-4 w-4" />
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
