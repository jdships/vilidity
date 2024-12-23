'use client';
import {} from '@repo/design-system/components/ui/dropdown-menu';
import {} from '@repo/design-system/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import { cn } from '@repo/design-system/lib/utils';
import {
  Bot,
  CircleCheckBig,
  FileCheck,
  HelpCircle,
  History,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Logo from '../public/logo.svg';
import { CommandMenu } from './command-menu';
import { PlanUsage } from './plan-usage';
import { NavValidations } from './sidebar/nav-validations';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType;
  isActive?: boolean;
}

interface SidebarData {
  navMain: NavItem[];
  navSecondary: NavItem[];
  myFiles: NavItem[];
}

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

const data: SidebarData = {
  navMain: [
    {
      title: 'Validate',
      href: '/',
      icon: CircleCheckBig,
    },
    {
      title: 'Vilidity AI',
      href: '/chat',
      icon: Bot,
    },
  ],
  myFiles: [
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
  ],
  navSecondary: [
    {
      title: 'Help',
      href: '/help',
      icon: HelpCircle,
    },
  ],
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="mb-2 flex h-11 items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-1 transition-opacity duration-200 hover:opacity-80"
                  >
                    <Image
                      src={Logo}
                      alt="Logo"
                      className="mr-[0.2rem] h-6 w-6 dark:invert"
                    />
                    <p className=" whitespace-nowrap font-bold text-sm uppercase tracking-wide">
                      Vilidity
                    </p>
                  </Link>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="w-full px-3">
                <CommandMenu />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      pathname === item.href &&
                        'bg-sidebar-accent hover:bg-sidebar-accent',
                      pathname.startsWith(item.href) &&
                        item.href !== '/' &&
                        'bg-sidebar-accent hover:bg-sidebar-accent'
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>My Validity</SidebarGroupLabel>
            <SidebarMenu>
              {data.myFiles.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      pathname === item.href &&
                        'bg-sidebar-accent hover:bg-sidebar-accent',
                      pathname.startsWith(item.href) &&
                        item.href !== '/' &&
                        'bg-sidebar-accent hover:bg-sidebar-accent'
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <NavValidations />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <PlanUsage />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
