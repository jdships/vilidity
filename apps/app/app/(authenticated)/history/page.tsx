import { PageContainer } from '@repo/design-system/components/ui/page-container';
import type { Metadata } from 'next';
import { Header } from '../components/header';
import {
  ChatHistory,
  type ChatHistoryItem,
} from '../components/history/chat-history';

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Chat with our AI assistant about your idea validation.',
};

export default function HistoryPage() {
  const mockHistory: ChatHistoryItem[] = [
    {
      id: '1',
      title: 'First Chat',
      lastMessage: 'This is the last message',
      messageCount: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'completed',
      category: 'general',
    },
  ];

  return (
    <>
      <Header pages={['My Vilidity']} page="History" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="Validations"
          description="View and manage your idea validations"
        >
          <ChatHistory history={mockHistory} />
        </PageContainer>
      </div>
    </>
  );
}
