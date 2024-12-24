'use client';

import { Message } from '@repo/ai/components/message';
import { Thread } from '@repo/ai/components/thread';
import { useChat } from '@repo/ai/lib/react';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { handleError } from '@repo/design-system/lib/utils';
import { Bot, File, PlusCircle, SendIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

export const Chatbot = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, isLoading, handleSubmit } =
    useChat({
      onError: handleError,
      api: '/api/chat',
    });

  const shouldAutoScroll = () => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return false;

    const threshold = 150; // Increased threshold
    const position = scrollArea.scrollTop + scrollArea.clientHeight;
    const height = scrollArea.scrollHeight;
    const distanceFromBottom = height - position;

    // Only auto-scroll if very close to bottom or already at bottom
    return distanceFromBottom <= threshold || distanceFromBottom === 0;
  };

  const scrollToBottom = useCallback(() => {
    if (shouldAutoScroll()) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: 'auto',
          block: 'end',
        });
      });
    }
  }, []);

  // Only scroll on new messages, not during streaming
  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages.length, scrollToBottom]); // Only trigger on new messages

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="col-span-12 lg:col-span-8">
        <CardContent className="flex h-[600px] flex-col p-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex h-[550px] items-center justify-center">
                <div className="text-center">
                  <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                  <p className="text-muted-foreground text-sm">
                    Ask me anything about your idea...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Thread className="space-y-4">
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      data={message}
                      className="rounded-md bg-muted px-4 py-2 text-sm"
                    />
                  ))}
                </Thread>
                <div ref={messagesEndRef} />
              </>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2"
            aria-disabled={isLoading}
            suppressHydrationWarning
          >
            <Input
              placeholder="Ask a question about your idea..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 bg-background text-sm"
              suppressHydrationWarning
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-md"
              variant="outline"
              disabled={isLoading}
              suppressHydrationWarning
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Card className="col-span-12 lg:col-span-4">
        <CardContent className="flex h-[600px] items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <File className="h-12 w-12 text-muted-foreground/60" />
            <p className="text-muted-foreground text-sm">
              You haven't validated any ideas yet
            </p>
            <Button variant="default" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Validate Your First Idea
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
