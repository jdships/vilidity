'use client';

import { UserButton, useAuth } from '@repo/auth/client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/design-system/components/ui/breadcrumb';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Separator } from '@repo/design-system/components/ui/separator';
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar';
import { Bell, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';

type HeaderProps = {
  pages: string[];
  page: string;
  children?: ReactNode;
};

export const Header = ({ pages, page, children }: HeaderProps) => {
  const { isLoaded } = useAuth();

  const renderUserMenu = () => {
    if (!isLoaded) {
      return (
        <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
      );
    }

    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'h-8 w-8',
            userButtonTrigger:
              'focus:shadow-none focus:outline-none focus-visible:ring-0',
            userButtonPopoverCard: 'shadow-lg',
          },
        }}
      />
    );
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 hidden h-4 md:block"
        />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {pages.map((page, index) => (
              <Fragment key={page}>
                {index > 0 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{page}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            ))}
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1 px-4">
        {/* <Link href="/upgrade">
          <Button variant="default" size="sm" className="gap-2">
            <SparklesIcon className="h-4 w-4" />
            <span>Upgrade</span>
          </Button>
        </Link> */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium">Analysis Complete</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Your e-commerce platform analysis is ready to view
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">New Message</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    You have a new message in the chat
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">Pro Trial Available</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Try Pro features free for 14 days
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {renderUserMenu()}
        {children}
      </div>
    </header>
  );
};
