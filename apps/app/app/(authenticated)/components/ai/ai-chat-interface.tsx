'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import { cn } from '@repo/design-system/lib/utils';
import { Bot, CornerDownLeft, Loader2, Mic, Paperclip } from 'lucide-react';
import { useState } from 'react';
import type { Message } from '../../types/validation';

interface AiChatInterfaceProps {
  title?: string;
  description?: string;
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  showInput?: boolean;
}

export function AiChatInterface({
  title,
  description,
  messages = [],
  onSendMessage,
  isLoading = false,
  className,
  placeholder = 'Type your message here...',
  showInput = true,
}: AiChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(inputValue.trim());
      setInputValue('');
    } catch (error) {
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  const renderMessageContent = (message: Message) => {
    return (
      <div
        className={cn(
          'flex items-start gap-3',
          message.role === 'ASSISTANT' && 'text-muted-foreground'
        )}
      >
        {message.role === 'ASSISTANT' && (
          <div className="rounded-full bg-primary/10 p-2">
            <Bot className="h-4 w-4 text-primary" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-primary text-sm leading-relaxed">
            {message.content}
          </p>
          <time className="text-muted-foreground text-xs">
            {formatTime(message.createdAt)}
          </time>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('flex w-full flex-col bg-muted/50', className)}>
      {title && description && (
        <CardHeader className="space-y-0 p-4 lg:p-6">
          <CardTitle className="font-semibold text-lg tracking-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent
        className={cn('flex-1 p-3 lg:p-4', !title && !description && 'pt-4')}
      >
        <ScrollArea className="h-full pr-3 lg:pr-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div key={message.id}>{renderMessageContent(message)}</div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Processing...</p>
              </div>
            )}
            {!isLoading && messages.length === 0 && (
              <div className="flex min-h-[400px] items-center justify-center sm:min-h-[600px]">
                <div className="text-center">
                  <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                  <p className="text-muted-foreground text-sm">
                    Lets validate your idea...
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      {showInput && (
        <CardFooter className="p-3 lg:p-4">
          <form
            onSubmit={handleSubmit}
            className={cn(
              'relative w-full overflow-hidden rounded-lg border bg-secondary/50 focus-within:ring-1 focus-within:ring-ring'
            )}
          >
            <Textarea
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
            />
            <div className="flex items-center p-3 pt-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={isLoading}>
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={isLoading}>
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
              </Tooltip>
              <Button
                type="submit"
                className="ml-auto gap-1.5"
                disabled={isSending || isLoading || !inputValue.trim()}
              >
                {isSending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}
