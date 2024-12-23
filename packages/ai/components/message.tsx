import { useUser } from '@repo/auth/client';
import type { Message as MessageType } from 'ai';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import { twMerge } from 'tailwind-merge';
import { Logo } from './icons/logo';

type MessageProps = {
  data: MessageType;
  markdown?: ComponentProps<typeof Markdown>;
  className?: string;
};

export const Message = ({ data, markdown, className }: MessageProps) => {
  const { user } = useUser();

  return (
    <div
      className={twMerge(
        'flex w-full gap-2',
        data.role === 'user' ? 'flex-row-reverse justify-end' : 'flex-row'
      )}
    >
      {/* Avatar - Now positioned at the top */}
      {data.role === 'user' ? (
        <div className="relative h-8 w-8 shrink-0 self-start overflow-hidden rounded-full">
          <Image
            src={user?.imageUrl ?? ''}
            alt="User"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center self-start">
          <Logo className="h-8 w-8 rounded-full dark:invert" />
        </div>
      )}

      {/* Message */}
      <div
        className={twMerge(
          'max-w-[80%] rounded-md px-4 py-1',
          data.role === 'user' ? 'bg-sidebar' : 'bg-muted',
          className
        )}
      >
        <Markdown className="prose-sm [&>p]:mb-0 [&>p]:leading-relaxed">
          {data.content}
        </Markdown>
      </div>
    </div>
  );
};
