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
      {/* Avatar */}
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
          'max-w-[80%] rounded-md px-8 py-6',
          data.role === 'user' ? 'bg-sidebar' : 'bg-muted',
          className
        )}
      >
        <Markdown
          className="prose prose-neutral dark:prose-invert prose-li:my-1 prose-ol:my-4 prose-p:my-4 prose-ul:my-4 prose-headings:mt-8 prose-headings:mb-4 max-w-none prose-ol:list-decimal prose-ul:list-disc whitespace-pre-wrap break-words prose-li:pl-2 prose-ol:pl-6 prose-ul:pl-6 prose-headings:font-semibold prose-headings:text-lg prose-strong:text-foreground prose-p:leading-7 first:prose-headings:mt-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          components={{
            h2: ({ children }) => (
              <h2 className="flex items-center gap-2 border-b pb-2">
                {children}
              </h2>
            ),
            ul: ({ children }) => (
              <ul className="not-prose space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="not-prose space-y-2">{children}</ol>
            ),
            p: ({ children }) => (
              <p className="not-prose whitespace-pre-wrap text-base">
                {children}
              </p>
            ),
            li: ({ children }) => (
              <li className="not-prose text-base leading-relaxed">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),
          }}
        >
          {data.content}
        </Markdown>
      </div>
    </div>
  );
};
