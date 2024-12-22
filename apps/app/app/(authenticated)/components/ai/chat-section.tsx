'use client';
import { log } from '@repo/observability/log';
import { useState } from 'react';
import type { Message, ValidationDetails } from '../../types/validation';
import { AiChatInterface } from './ai-chat-interface';

interface ChatSectionProps {
  validation: ValidationDetails;
}

export function ChatSection({ validation }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `I've analyzed "${
        validation.title ?? 'Untitled Project'
      }". What would you like to know about the market validation?`,
      role: 'ASSISTANT',
      createdAt: new Date(),
      validationId: validation.id,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'USER',
      createdAt: new Date(),
      validationId: validation.id,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    try {
      // Here you would typically make an API call to your AI service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated AI response...',
        role: 'ASSISTANT',
        createdAt: new Date(),
        validationId: validation.id,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      log.error('Failed to get AI response:', { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AiChatInterface
      title="Validity Assistant"
      description="Chat with our AI to refine your idea"
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      className="bg-background shadow-sm"
      placeholder="Ask about market validation, technical feasibility, or business strategy..."
    />
  );
}
