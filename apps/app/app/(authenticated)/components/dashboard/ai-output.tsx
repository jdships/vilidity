'use client';
import { Card, CardContent } from '@repo/design-system/components/ui/card';
import {} from '@repo/design-system/components/ui/tooltip';
import { Bot } from 'lucide-react';

interface AiOutputProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AiOutput() {
  return (
    <Card>
      <CardContent>
        <div className="flex min-h-[400px] items-center justify-center sm:min-h-[622px]">
          <div className="text-center">
            <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
            <p className="text-muted-foreground text-sm">
              Lets validate your idea...
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
