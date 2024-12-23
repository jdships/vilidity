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
import { Bot, SendIcon } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

export const Chatbot = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, isLoading, handleSubmit } =
    useChat({
      onError: handleError,
      api: '/api/chat',
    });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Chat Area - 2/3 width */}
      <Card className="col-span-12 lg:col-span-8">
        <CardContent className="flex h-[600px] flex-col p-0">
          <ScrollArea className="flex-1 p-4">
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
        <CardFooter className="border-t p-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2"
            aria-disabled={isLoading}
          >
            <Input
              placeholder="Ask a question about your idea..."
              value={input}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* Context Area - 1/3 width */}
      <Card className="col-span-12 lg:col-span-4">
        <CardContent className="p-6">
          <h3 className="font-semibold">Chat Context</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            I can help you with:
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              • Market analysis and trends
            </li>
            <li className="flex items-center gap-2">• Competitor insights</li>
            <li className="flex items-center gap-2">• Validation strategies</li>
            <li className="flex items-center gap-2">• Growth opportunities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
