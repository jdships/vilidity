'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {} from '@repo/design-system/components/ui/tooltip';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MessageCircle, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import type { ChatHistoryItem } from './chat-history';

export const chatHistoryColumns: ColumnDef<ChatHistoryItem>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-8 px-2"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title: string = row.getValue('title');
      return (
        <div className="flex max-w-[300px] items-center gap-2">
          <MessageCircle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <span className="truncate font-medium">{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span className="text-muted-foreground capitalize">
        {row.getValue('category')}
      </span>
    ),
  },
  {
    accessorKey: 'lastMessage',
    header: () => <div className="text-xs">Last Message</div>,
    cell: ({ row }) => {
      const message: string = row.getValue('lastMessage');
      return (
        <div className="max-w-[400px] truncate text-muted-foreground text-sm">
          {message}
        </div>
      );
    },
  },
  {
    accessorKey: 'messageCount',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="h-8 px-2"
        >
          Messages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const count: number = row.getValue('messageCount');
      return (
        <div className="flex items-center justify-center">
          <span className="text-sm tabular-nums">{count}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
          className="h-8 px-2"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt');
      return (
        <div className="flex items-center justify-center">
          <span className="text-muted-foreground text-sm">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center text-xs">Actions</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/chat/${row.original.id}`}>Continue Chat</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
