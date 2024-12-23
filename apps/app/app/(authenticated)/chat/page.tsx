import { PageContainer } from '@repo/design-system/components/ui/page-container';
import type { Metadata } from 'next';
import { Chatbot } from '../components/chat/chatbot';
import { Header } from '../components/header';

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Chat with our AI assistant about your idea validation.',
};

export default function ChatPage() {
  return (
    <>
      <Header pages={['Platform']} page="Chat" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <PageContainer
          heading="AI Chat"
          description="Discuss your idea with our AI assistant to get deeper insights."
        >
          <Chatbot />
        </PageContainer>
      </div>
    </>
  );
}
