'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/design-system/components/ui/sidebar';
import { Bot, Download, Eye, FileCheck, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const validations = [
  {
    name: 'E-commerce Platform',
    url: '/validations/1',
    icon: FileCheck,
  },
  {
    name: 'SaaS Application',
    url: '/validations/2',
    icon: FileCheck,
  },
  {
    name: 'Mobile App',
    url: '/validations/3',
    icon: FileCheck,
  },
];

export function NavValidations() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Validations</SidebarGroupLabel>
      <SidebarMenu>
        {validations.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Validation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bot className="mr-2 h-4 w-4" />
                  Chat with AI
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
